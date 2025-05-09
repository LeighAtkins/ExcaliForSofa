/**
 * ExcaliForSofa - Unit Conversion Utilities
 * 
 * This file provides utility functions for converting between imperial and metric
 * measurements with the proper precision requirements.
 */

import { 
  INCHES_TO_CM, 
  CM_TO_INCHES, 
  IMPERIAL_PRECISION, 
  METRIC_PRECISION,
  IMPERIAL_FRACTIONS 
} from '../constants/measurements';
import { MeasurementValue } from '../types/app';

/**
 * Convert a measurement in inches to centimeters
 * @param inches The measurement in inches
 * @returns The measurement in centimeters, rounded to 1 decimal place
 */
export const inchesToCm = (inches: number): number => {
  return Math.round(inches * INCHES_TO_CM * 10) / 10;
};

/**
 * Convert a measurement in centimeters to inches
 * @param cm The measurement in centimeters
 * @returns The measurement in inches
 */
export const cmToInches = (cm: number): number => {
  // Convert to inches
  const exactInches = cm * CM_TO_INCHES;
  
  // Round to the nearest 1/8th inch
  return Math.round(exactInches / IMPERIAL_PRECISION) * IMPERIAL_PRECISION;
};

/**
 * Parse an imperial measurement string (e.g., "24 1/2") to a number
 * @param value The imperial measurement string
 * @returns The measurement as a number
 */
export const parseImperialString = (value: string): number => {
  // Remove the inch symbol
  const withoutSymbol = value.replace('"', '').trim();
  
  // Check if we have a mixed number (e.g., "24 1/2")
  if (withoutSymbol.includes(' ')) {
    const [wholeStr, fractionStr] = withoutSymbol.split(' ');
    const whole = parseInt(wholeStr, 10);
    
    // Find the matching fraction
    const fraction = IMPERIAL_FRACTIONS.find(f => f.display === fractionStr);
    
    if (fraction) {
      return whole + fraction.value;
    }
    
    // Try to evaluate the fraction directly
    if (fractionStr.includes('/')) {
      const [num, denom] = fractionStr.split('/').map(n => parseInt(n, 10));
      return whole + (num / denom);
    }
    
    return whole;
  }
  
  // Handle decimal input
  return parseFloat(withoutSymbol);
};

/**
 * Format a numeric value as an imperial measurement string
 * @param value The measurement value
 * @returns Formatted imperial measurement string
 */
export const formatImperial = (value: number): string => {
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
};

/**
 * Format a numeric value as a metric measurement string
 * @param value The measurement value
 * @returns Formatted metric measurement string
 */
export const formatMetric = (value: number): string => {
  // Round to 1 decimal place
  return `${(Math.round(value * 10) / 10).toFixed(1)} cm`;
};

/**
 * Create a measurement value object with both imperial and metric representations
 * @param value The numeric value
 * @param isPrimaryImperial Whether the primary unit is imperial
 * @returns A MeasurementValue object
 */
export const createMeasurementValue = (
  value: number, 
  isPrimaryImperial: boolean
): MeasurementValue => {
  if (isPrimaryImperial) {
    // Primary unit is imperial, derive metric
    return {
      rawValue: value,
      isPrimaryImperial,
      imperialValue: formatImperial(value),
      metricValue: formatMetric(inchesToCm(value))
    };
  } else {
    // Primary unit is metric, derive imperial
    return {
      rawValue: value,
      isPrimaryImperial,
      metricValue: formatMetric(value),
      imperialValue: formatImperial(cmToInches(value))
    };
  }
};

/**
 * Toggle the primary unit of a measurement value
 * @param measurement The measurement value to toggle
 * @returns A new measurement value with the opposite primary unit
 */
export const toggleMeasurementUnit = (measurement: MeasurementValue): MeasurementValue => {
  const { rawValue, isPrimaryImperial } = measurement;
  
  if (isPrimaryImperial) {
    // Convert to metric as primary
    const valueInCm = inchesToCm(rawValue);
    return createMeasurementValue(valueInCm, false);
  } else {
    // Convert to imperial as primary
    const valueInInches = cmToInches(rawValue);
    return createMeasurementValue(valueInInches, true);
  }
}; 