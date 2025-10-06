# Mermaid Diagram Color Standards

All Mermaid diagrams in the documentation should use consistent colors matching the Eagle Finance brand theme.

## Standard Color Palette

### Primary Colors (Golden Theme)
- **Primary Golden**: `#fbbf24` - Main brand color
- **Dark Golden**: `#d97706` - Borders and accents
- **Light Golden**: `#fef3cd` - Backgrounds
- **Very Light Golden**: `#fff5e1` - Secondary backgrounds

### Semantic Colors
- **Success/Active**: `#10b981` (emerald green)
- **Info/Links**: `#3b82f6` (bright blue)
- **Warning/Important**: `#ef4444` (bright red)
- **Neutral**: `#6b7280` (gray)

## Implementation in Mermaid

### For Graph Diagrams
```mermaid
%%{init: {'theme':'base', 'themeVariables': {
  'primaryColor':'#fbbf24',
  'primaryTextColor':'#000',
  'primaryBorderColor':'#d97706',
  'lineColor':'#d97706',
  'secondaryColor':'#fef3cd',
  'tertiaryColor':'#fff5e1'
}}}%%
```

### For Sequence Diagrams  
```mermaid
%%{init: {'theme':'base', 'themeVariables': {
  'actorBkg':'#fbbf24',
  'actorBorder':'#d97706',
  'actorTextColor':'#000',
  'signalColor':'#d97706',
  'signalTextColor':'#000',
  'labelBoxBkgColor':'#fbbf24',
  'labelBoxBorderColor':'#d97706'
}}}%%
```

## Usage Guidelines

1. **Always specify theme config** at the start of each Mermaid diagram
2. **Use high-contrast text** (`#000` for black, `#fff` for white) to ensure readability
3. **Maintain consistency** across all documentation pages
4. **Test in both light and dark modes** when making changes

## Global Theme Configuration

The global Mermaid theme is configured in `docusaurus.config.ts` and applies to all diagrams automatically. Individual diagrams should not override these settings unless absolutely necessary.

