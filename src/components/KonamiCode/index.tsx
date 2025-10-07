import React, { useEffect, useState } from 'react';
import './styles.css';

const KONAMI_CODE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
];

export default function KonamiCode() {
  const [showModal, setShowModal] = useState(false);
  const [keysPressed, setKeysPressed] = useState<string[]>([]);
  const [glitchActive, setGlitchActive] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const newKeys = [...keysPressed, e.key].slice(-KONAMI_CODE.length);
      setKeysPressed(newKeys);

      const isMatch = KONAMI_CODE.every((key, i) => key === newKeys[i]);
      
      if (isMatch && !showModal) {
        setGlitchActive(true);
        setTimeout(() => {
          setShowModal(true);
          setGlitchActive(false);
        }, 500);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [keysPressed, showModal]);

  if (!showModal && !glitchActive) return null;

  return (
    <>
      {glitchActive && (
        <div className="konami-glitch-overlay">
          <div className="glitch-text">ACCESS GRANTED</div>
        </div>
      )}
      
      {showModal && (
        <div className="konami-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="konami-modal" onClick={(e) => e.stopPropagation()}>
            <button className="konami-close" onClick={() => setShowModal(false)}>×</button>
            
            <div className="konami-header">
              <h1 className="konami-title">🦅 CLASSIFIED: EAGLE PROTOCOLS</h1>
              <p className="konami-subtitle">Level 47 Clearance • Eyes Only</p>
            </div>

            <div className="konami-content">
              <section className="konami-section">
                <h2>📜 The Origin Story</h2>
                <p>
                  In the early days of 2024, a small team of DeFi enthusiasts gathered with a vision: 
                  to solve the fragmentation problem plaguing cross-chain yield strategies. 
                  The codename? <strong>Project Eagle</strong>.
                </p>
                <p>
                  Why "Eagle"? Because eagles soar above the landscape, seeing opportunities others miss. 
                  They're patient, precise, and strike with perfect timing. Just like our omnichain vaults.
                </p>
                <p className="konami-quote">
                  "We chose 47 not randomly, but because it appears everywhere in the universe. 
                  It's the atomic number of silver, the number of strings on a harp, and allegedly, 
                  the most random number. It represents our commitment to finding order in chaos."
                  <span className="konami-attribution">— Lead Architect, 2024</span>
                </p>
              </section>

              <section className="konami-section">
                <h2>🎭 Behind the Scenes</h2>
                <div className="konami-facts">
                  <div className="konami-fact">
                    <span className="konami-fact-icon">☕</span>
                    <div>
                      <strong>Coffee Consumed:</strong> Over 1,247 cups during the initial protocol design phase
                    </div>
                  </div>
                  <div className="konami-fact">
                    <span className="konami-fact-icon">🌙</span>
                    <div>
                      <strong>Late Night Sessions:</strong> The LayerZero integration was architected entirely between 2 AM and 6 AM
                    </div>
                  </div>
                  <div className="konami-fact">
                    <span className="konami-fact-icon">🐛</span>
                    <div>
                      <strong>Weirdest Bug:</strong> A missing semicolon caused deposits to work only on Tuesdays. We still don't know why.
                    </div>
                  </div>
                  <div className="konami-fact">
                    <span className="konami-fact-icon">🎨</span>
                    <div>
                      <strong>Design Iterations:</strong> The tunnel animation went through 23 versions before we nailed the "flying through space" feeling
                    </div>
                  </div>
                  <div className="konami-fact">
                    <span className="konami-fact-icon">🔐</span>
                    <div>
                      <strong>Security First:</strong> We ran 7 internal audits before the first external audit. Paranoid? Maybe. Secure? Absolutely.
                    </div>
                  </div>
                </div>
              </section>

              <section className="konami-section">
                <h2>🚀 The Tech Stack Story</h2>
                <p>
                  <strong>Why LayerZero?</strong> After evaluating 12 different cross-chain messaging protocols, 
                  LayerZero V2 was the only one that matched our security standards and didn't require bridge compromises.
                </p>
                <p>
                  <strong>Why Charm Finance?</strong> Their Alpha Vaults have a proven track record. 
                  We tested 5 different Uniswap V3 management strategies. Charm's approach to rebalancing was mathematically elegant.
                </p>
                <p>
                  <strong>Why ERC-4626?</strong> Because standards matter. We wanted any protocol to be able to integrate 
                  with Eagle Vaults without custom integration work.
                </p>
              </section>

              <section className="konami-section konami-terminal">
                <h2>💻 Developer Easter Eggs</h2>
                <div className="konami-code-block">
                  <code>
                    <span className="code-comment">// Hidden in EagleOVault.sol, line 47:</span><br/>
                    <span className="code-comment">// "If you're reading this, you're either auditing or curious.</span><br/>
                    <span className="code-comment">//  Either way, welcome. Coffee's in the break room."</span><br/>
                    <br/>
                    <span className="code-comment">// Our CREATE2 factory address isn't random:</span><br/>
                    <span className="code-keyword">address</span> <span className="code-const">FACTORY</span> = <span className="code-string">0x695d6B3628B4701E7eAfC0bc511CbAF23f6003eE</span>;<br/>
                    <span className="code-comment">// Read the hex carefully... 😉</span>
                  </code>
                </div>
              </section>

              <section className="konami-section">
                <h2>🎯 The Mission</h2>
                <p>
                  Eagle Finance isn't just another DeFi protocol. It's a statement that cross-chain 
                  doesn't have to mean compromise. That security and innovation can coexist. 
                  That yield strategies can be both sophisticated and accessible.
                </p>
                <p className="konami-manifesto">
                  We believe in:
                </p>
                <ul className="konami-beliefs">
                  <li>🔓 Open source everything</li>
                  <li>🛡️ Security through transparency</li>
                  <li>🌐 True omnichain, not multi-chain</li>
                  <li>📚 Education as a cornerstone</li>
                  <li>🤝 Community governance</li>
                </ul>
              </section>

              <section className="konami-section konami-finale">
                <h2>✨ You Found It!</h2>
                <p>
                  Congratulations, you've discovered the Konami Code easter egg! You're now part of an 
                  elite group who knows that we take our work seriously, but not ourselves.
                </p>
                <p className="konami-signature">
                  — The Eagle Finance Team<br/>
                  <em>"Building the future, one block at a time"</em>
                </p>
              </section>
            </div>

            <div className="konami-footer">
              <p>Press ESC or click outside to close</p>
              <p className="konami-hint">🎮 For more secrets, explore the team portal...</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

