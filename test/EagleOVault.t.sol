// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import {Test, console} from "forge-std/Test.sol";
import {EagleOVault} from "../contracts/EagleOVault.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {ERC20Mock} from "@openzeppelin/contracts/mocks/token/ERC20Mock.sol";

/**
 * @title EagleOVault Test Suite
 * @dev Comprehensive testing for the EagleOVault contract
 */
contract EagleOVaultTest is Test {
    EagleOVault public vault;
    ERC20Mock public wlfiToken;
    ERC20Mock public usd1Token;
    
    address public owner = address(0x1);
    address public user1 = address(0x2);
    address public user2 = address(0x3);
    
    uint256 public constant INITIAL_SUPPLY = 1_000_000e18;
    uint256 public constant DEPOSIT_AMOUNT = 1000e18;

    function setUp() public {
        // Deploy mock tokens
        wlfiToken = new ERC20Mock();
        usd1Token = new ERC20Mock();
        
        // Mint initial supply to test addresses
        wlfiToken.mint(owner, INITIAL_SUPPLY);
        wlfiToken.mint(user1, INITIAL_SUPPLY);
        wlfiToken.mint(user2, INITIAL_SUPPLY);
        
        usd1Token.mint(owner, INITIAL_SUPPLY);
        usd1Token.mint(user1, INITIAL_SUPPLY);
        usd1Token.mint(user2, INITIAL_SUPPLY);
        
        // Deploy vault
        vm.prank(owner);
        vault = new EagleOVault(
            address(wlfiToken),
            address(usd1Token),
            owner
        );
    }

    function testInitialState() public {
        assertEq(vault.name(), "Eagle");
        assertEq(vault.symbol(), "EAGLE");
        assertEq(address(vault.asset()), address(wlfiToken));
        assertEq(vault.owner(), owner);
        assertTrue(vault.authorized(owner));
    }

    function testDeposit() public {
        vm.startPrank(user1);
        
        // Approve tokens
        wlfiToken.approve(address(vault), DEPOSIT_AMOUNT);
        
        // Deposit
        uint256 shares = vault.deposit(DEPOSIT_AMOUNT, user1);
        
        // Verify results
        assertEq(vault.balanceOf(user1), shares);
        assertEq(vault.totalAssets(), DEPOSIT_AMOUNT);
        assertGt(shares, 0);
        
        vm.stopPrank();
    }

    function testWithdraw() public {
        // First, user deposits
        vm.startPrank(user1);
        wlfiToken.approve(address(vault), DEPOSIT_AMOUNT);
        uint256 shares = vault.deposit(DEPOSIT_AMOUNT, user1);
        
        // Then withdraws
        uint256 initialBalance = wlfiToken.balanceOf(user1);
        uint256 assets = vault.withdraw(DEPOSIT_AMOUNT / 2, user1, user1);
        
        // Verify withdrawal
        assertGt(assets, 0);
        assertEq(wlfiToken.balanceOf(user1), initialBalance + assets);
        assertLt(vault.balanceOf(user1), shares);
        
        vm.stopPrank();
    }

    function testRedeem() public {
        // User deposits first
        vm.startPrank(user1);
        wlfiToken.approve(address(vault), DEPOSIT_AMOUNT);
        uint256 shares = vault.deposit(DEPOSIT_AMOUNT, user1);
        
        // Redeem half the shares
        uint256 initialBalance = wlfiToken.balanceOf(user1);
        uint256 assets = vault.redeem(shares / 2, user1, user1);
        
        // Verify redemption
        assertGt(assets, 0);
        assertEq(wlfiToken.balanceOf(user1), initialBalance + assets);
        assertEq(vault.balanceOf(user1), shares - shares / 2);
        
        vm.stopPrank();
    }

    function testMaxDeposit() public {
        uint256 maxDeposit = vault.maxDeposit(user1);
        assertEq(maxDeposit, type(uint256).max);
    }

    function testMaxMint() public {
        uint256 maxMint = vault.maxMint(user1);
        assertEq(maxMint, type(uint256).max);
    }

    function testPreviewDeposit() public {
        uint256 shares = vault.previewDeposit(DEPOSIT_AMOUNT);
        assertEq(shares, DEPOSIT_AMOUNT); // 1:1 ratio when vault is empty
    }

    function testPreviewMint() public {
        uint256 assets = vault.previewMint(DEPOSIT_AMOUNT);
        assertEq(assets, DEPOSIT_AMOUNT); // 1:1 ratio when vault is empty
    }

    function testPreviewWithdraw() public {
        // Need some deposits first
        vm.prank(user1);
        wlfiToken.approve(address(vault), DEPOSIT_AMOUNT);
        vm.prank(user1);
        vault.deposit(DEPOSIT_AMOUNT, user1);
        
        uint256 shares = vault.previewWithdraw(DEPOSIT_AMOUNT / 2);
        assertGt(shares, 0);
    }

    function testPreviewRedeem() public {
        // Need some deposits first
        vm.prank(user1);
        wlfiToken.approve(address(vault), DEPOSIT_AMOUNT);
        vm.prank(user1);
        uint256 shares = vault.deposit(DEPOSIT_AMOUNT, user1);
        
        uint256 assets = vault.previewRedeem(shares / 2);
        assertGt(assets, 0);
    }

    function testTotalAssets() public {
        assertEq(vault.totalAssets(), 0);
        
        // After deposit
        vm.prank(user1);
        wlfiToken.approve(address(vault), DEPOSIT_AMOUNT);
        vm.prank(user1);
        vault.deposit(DEPOSIT_AMOUNT, user1);
        
        assertEq(vault.totalAssets(), DEPOSIT_AMOUNT);
    }

    function testConvertToShares() public {
        uint256 shares = vault.convertToShares(DEPOSIT_AMOUNT);
        assertEq(shares, DEPOSIT_AMOUNT); // 1:1 when vault is empty
    }

    function testConvertToAssets() public {
        uint256 assets = vault.convertToAssets(DEPOSIT_AMOUNT);
        assertEq(assets, DEPOSIT_AMOUNT); // 1:1 when vault is empty
    }

    function testFailDepositZeroAmount() public {
        vm.prank(user1);
        vault.deposit(0, user1);
    }

    function testFailDepositWithoutApproval() public {
        vm.prank(user1);
        vault.deposit(DEPOSIT_AMOUNT, user1);
    }

    function testFailWithdrawMoreThanBalance() public {
        vm.prank(user1);
        vault.withdraw(DEPOSIT_AMOUNT, user1, user1);
    }

    function testAuthorizationSystem() public {
        // Only owner can authorize
        vm.prank(owner);
        vault.setAuthorized(user1, true);
        assertTrue(vault.authorized(user1));
        
        // Unauthorized user cannot authorize
        vm.prank(user2);
        vm.expectRevert();
        vault.setAuthorized(user1, false);
    }

    function testAccessControl() public {
        // Test that only authorized can call restricted functions
        vm.prank(user1);
        vm.expectRevert();
        vault.setManager(user1);
        
        // But owner can
        vm.prank(owner);
        vault.setManager(user1);
        assertEq(vault.manager(), user1);
    }
}
