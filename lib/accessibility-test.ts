import axe from 'axe-core';

export interface AccessibilityResult {
  violations: axe.Result[];
  passes: axe.Result[];
  incomplete: axe.Result[];
  inapplicable: axe.Result[];
}

/**
 * Run accessibility tests on a given element
 * @param element - The DOM element to test (defaults to document)
 * @param rules - Specific rules to test (optional)
 * @returns Promise with accessibility results
 */
export async function runAccessibilityTest(
  element: Element = document.body,
  rules?: string[]
): Promise<AccessibilityResult> {
  return new Promise((resolve, reject) => {
    const config: axe.RunOptions = {
      rules: rules ? { [rules.join(',')]: { enabled: true } } : undefined,
    };

    axe.run(element, config, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

/**
 * Run accessibility tests with WCAG 2.1 AA compliance focus
 */
export async function runWCAG21AATest(element: Element = document.body): Promise<AccessibilityResult> {
  const wcag21AARules = [
    'area-alt',
    'aria-allowed-role',
    'aria-hidden-body',
    'aria-hidden-focus',
    'aria-input-field-name',
    'aria-toggle-field-name',
    'aria-valid-attr-value',
    'aria-roles',
    'button-name',
    'color-contrast',
    'definition-list',
    'dlitem',
    'document-title',
    'duplicate-id-active',
    'duplicate-id-aria',
    'form-field-multiple-labels',
    'frame-title',
    'heading-order',
    'hidden-content',
    'html-has-lang',
    'image-alt',
    'input-image-alt',
    'label',
    'link-name',
    'list',
    'listitem',
    'meta-viewport',
    'object-alt',
    'tabindex',
    'valid-lang',
  ];

  return runAccessibilityTest(element, wcag21AARules);
}

/**
 * Log accessibility violations to console
 */
export function logAccessibilityViolations(results: AccessibilityResult): void {
  console.group('🚨 Accessibility Test Results');

  if (results.violations.length > 0) {
    console.error(`❌ ${results.violations.length} violations found:`);
    results.violations.forEach((violation, index) => {
      console.error(`${index + 1}. ${violation.id}: ${violation.description}`);
      console.error(`   Impact: ${violation.impact}`);
      console.error(`   Help: ${violation.help}`);
      console.error(`   Help URL: ${violation.helpUrl}`);
      if (violation.nodes.length > 0) {
        console.error(`   Affected elements: ${violation.nodes.length}`);
        violation.nodes.forEach((node, nodeIndex) => {
          console.error(`     ${nodeIndex + 1}. ${node.target.join(', ')}`);
        });
      }
      console.error('');
    });
  } else {
    console.log('✅ No accessibility violations found!');
  }

  console.log(`📊 Summary:`);
  console.log(`   - Violations: ${results.violations.length}`);
  console.log(`   - Passes: ${results.passes.length}`);
  console.log(`   - Incomplete: ${results.incomplete.length}`);
  console.log(`   - Inapplicable: ${results.inapplicable.length}`);

  console.groupEnd();
}