/**
 * ExcaliForSofa - Measurement Constants
 * 
 * This file contains constants and configuration related to measurements,
 * unit conversions, and validation.
 */

/**
 * Conversion factor from inches to centimeters
 */
export const INCHES_TO_CM = 2.54;

/**
 * Conversion factor from centimeters to inches
 */
export const CM_TO_INCHES = 0.393701;

/**
 * The smallest increment for imperial measurements (1/8 inch)
 */
export const IMPERIAL_PRECISION = 0.125;

/**
 * The decimal precision for metric measurements (0.1 cm)
 */
export const METRIC_PRECISION = 0.1;

/**
 * Available imperial fractions for display and input
 */
export const IMPERIAL_FRACTIONS = [
  { value: 0, display: '0' },
  { value: 0.125, display: '1/8' },
  { value: 0.25, display: '1/4' },
  { value: 0.375, display: '3/8' },
  { value: 0.5, display: '1/2' },
  { value: 0.625, display: '5/8' },
  { value: 0.75, display: '3/4' },
  { value: 0.875, display: '7/8' },
];

/**
 * Common sofa measurement ranges for validation (in inches)
 */
export const MEASUREMENT_VALIDATION_RANGES = {
  // Typical sofa width range
  sofaWidth: { min: 60, max: 120 },
  // Typical sofa depth range
  sofaDepth: { min: 30, max: 60 },
  // Typical sofa height range
  sofaHeight: { min: 24, max: 48 },
  // Typical cushion width range
  cushionWidth: { min: 18, max: 36 },
  // Typical cushion depth range
  cushionDepth: { min: 18, max: 30 },
  // Typical armrest width range
  armrestWidth: { min: 3, max: 12 },
  // Typical armrest height range
  armrestHeight: { min: 6, max: 24 },
  // Typical backrest height range
  backrestHeight: { min: 18, max: 48 },
};

/**
 * Units display formats
 */
export const UNITS_DISPLAY = {
  imperial: {
    unit: 'in',
    unitLong: 'inches',
    format: (value: number): string => {
      const wholeNumber = Math.floor(value);
      const fraction = value - wholeNumber;
      
      // Find the closest fraction
      const closestFraction = IMPERIAL_FRACTIONS.reduce((prev, curr) => {
        return Math.abs(curr.value - fraction) < Math.abs(prev.value - fraction) ? curr : prev;
      });
      
      if (closestFraction.value === 0) {
        return `${wholeNumber}"`;
      }
      
      return `${wholeNumber} ${closestFraction.display}"`;
    }
  },
  metric: {
    unit: 'cm',
    unitLong: 'centimeters',
    format: (value: number): string => {
      // Round to 1 decimal place
      return `${(Math.round(value * 10) / 10).toFixed(1)} cm`;
    }
  }
}; 