/**
 * ExcaliForSofa - Validation Utilities
 * 
 * This file provides utility functions for validating measurements
 * and detecting potential errors in user inputs.
 */

import { MeasurementType, SofaPartType } from '../types/app';
import { MEASUREMENT_VALIDATION_RANGES } from '../constants/measurements';

/**
 * Check if a measurement value is within the expected range for a given part type
 * @param value The measurement value in inches
 * @param measurementType The type of measurement (e.g., length, width, height)
 * @param partType The type of sofa part being measured
 * @returns Object with validation result and possible error message
 */
export const validateMeasurement = (
  value: number,
  measurementType: MeasurementType,
  partType?: SofaPartType
): { isValid: boolean; errorMessage?: string } => {
  // If we don't have a specific part type, use general validation
  if (!partType) {
    return validateGeneralMeasurement(value, measurementType);
  }

  // Validate based on part type and measurement type
  switch (partType) {
    case SofaPartType.FRAME:
      return validateFrameMeasurement(value, measurementType);
    case SofaPartType.CUSHION:
      return validateCushionMeasurement(value, measurementType);
    case SofaPartType.ARMREST:
      return validateArmrestMeasurement(value, measurementType);
    case SofaPartType.BACKREST:
      return validateBackrestMeasurement(value, measurementType);
    default:
      return validateGeneralMeasurement(value, measurementType);
  }
};

/**
 * Validate a general measurement without specific part context
 */
const validateGeneralMeasurement = (
  value: number,
  measurementType: MeasurementType
): { isValid: boolean; errorMessage?: string } => {
  // General minimum value - nothing should be negative
  if (value < 0) {
    return {
      isValid: false,
      errorMessage: 'Measurement cannot be negative',
    };
  }

  // General maximum value - nothing on a sofa should be larger than 200 inches (508 cm)
  if (value > 200) {
    return {
      isValid: false,
      errorMessage: 'Measurement exceeds maximum reasonable value',
    };
  }

  // For specific measurement types, we can be more precise
  switch (measurementType) {
    case MeasurementType.WIDTH:
      if (value < 1 || value > 150) {
        return {
          isValid: false,
          errorMessage: 'Width measurement is outside reasonable range',
        };
      }
      break;
    case MeasurementType.HEIGHT:
      if (value < 1 || value > 60) {
        return {
          isValid: false,
          errorMessage: 'Height measurement is outside reasonable range',
        };
      }
      break;
    case MeasurementType.DEPTH:
      if (value < 1 || value > 60) {
        return {
          isValid: false,
          errorMessage: 'Depth measurement is outside reasonable range',
        };
      }
      break;
  }

  return { isValid: true };
};

/**
 * Validate a measurement for the sofa frame
 */
const validateFrameMeasurement = (
  value: number,
  measurementType: MeasurementType
): { isValid: boolean; errorMessage?: string } => {
  switch (measurementType) {
    case MeasurementType.WIDTH:
      if (value < MEASUREMENT_VALIDATION_RANGES.sofaWidth.min || 
          value > MEASUREMENT_VALIDATION_RANGES.sofaWidth.max) {
        return {
          isValid: false,
          errorMessage: `Sofa width is typically between ${MEASUREMENT_VALIDATION_RANGES.sofaWidth.min}" and ${MEASUREMENT_VALIDATION_RANGES.sofaWidth.max}"`,
        };
      }
      break;
    case MeasurementType.DEPTH:
      if (value < MEASUREMENT_VALIDATION_RANGES.sofaDepth.min || 
          value > MEASUREMENT_VALIDATION_RANGES.sofaDepth.max) {
        return {
          isValid: false,
          errorMessage: `Sofa depth is typically between ${MEASUREMENT_VALIDATION_RANGES.sofaDepth.min}" and ${MEASUREMENT_VALIDATION_RANGES.sofaDepth.max}"`,
        };
      }
      break;
    case MeasurementType.HEIGHT:
      if (value < MEASUREMENT_VALIDATION_RANGES.sofaHeight.min || 
          value > MEASUREMENT_VALIDATION_RANGES.sofaHeight.max) {
        return {
          isValid: false,
          errorMessage: `Sofa height is typically between ${MEASUREMENT_VALIDATION_RANGES.sofaHeight.min}" and ${MEASUREMENT_VALIDATION_RANGES.sofaHeight.max}"`,
        };
      }
      break;
  }

  return { isValid: true };
};

/**
 * Validate a measurement for cushions
 */
const validateCushionMeasurement = (
  value: number,
  measurementType: MeasurementType
): { isValid: boolean; errorMessage?: string } => {
  switch (measurementType) {
    case MeasurementType.WIDTH:
      if (value < MEASUREMENT_VALIDATION_RANGES.cushionWidth.min || 
          value > MEASUREMENT_VALIDATION_RANGES.cushionWidth.max) {
        return {
          isValid: false,
          errorMessage: `Cushion width is typically between ${MEASUREMENT_VALIDATION_RANGES.cushionWidth.min}" and ${MEASUREMENT_VALIDATION_RANGES.cushionWidth.max}"`,
        };
      }
      break;
    case MeasurementType.DEPTH:
      if (value < MEASUREMENT_VALIDATION_RANGES.cushionDepth.min || 
          value > MEASUREMENT_VALIDATION_RANGES.cushionDepth.max) {
        return {
          isValid: false,
          errorMessage: `Cushion depth is typically between ${MEASUREMENT_VALIDATION_RANGES.cushionDepth.min}" and ${MEASUREMENT_VALIDATION_RANGES.cushionDepth.max}"`,
        };
      }
      break;
  }

  return { isValid: true };
};

/**
 * Validate a measurement for armrests
 */
const validateArmrestMeasurement = (
  value: number,
  measurementType: MeasurementType
): { isValid: boolean; errorMessage?: string } => {
  switch (measurementType) {
    case MeasurementType.WIDTH:
      if (value < MEASUREMENT_VALIDATION_RANGES.armrestWidth.min || 
          value > MEASUREMENT_VALIDATION_RANGES.armrestWidth.max) {
        return {
          isValid: false,
          errorMessage: `Armrest width is typically between ${MEASUREMENT_VALIDATION_RANGES.armrestWidth.min}" and ${MEASUREMENT_VALIDATION_RANGES.armrestWidth.max}"`,
        };
      }
      break;
    case MeasurementType.HEIGHT:
      if (value < MEASUREMENT_VALIDATION_RANGES.armrestHeight.min || 
          value > MEASUREMENT_VALIDATION_RANGES.armrestHeight.max) {
        return {
          isValid: false,
          errorMessage: `Armrest height is typically between ${MEASUREMENT_VALIDATION_RANGES.armrestHeight.min}" and ${MEASUREMENT_VALIDATION_RANGES.armrestHeight.max}"`,
        };
      }
      break;
  }

  return { isValid: true };
};

/**
 * Validate a measurement for backrests
 */
const validateBackrestMeasurement = (
  value: number,
  measurementType: MeasurementType
): { isValid: boolean; errorMessage?: string } => {
  switch (measurementType) {
    case MeasurementType.HEIGHT:
      if (value < MEASUREMENT_VALIDATION_RANGES.backrestHeight.min || 
          value > MEASUREMENT_VALIDATION_RANGES.backrestHeight.max) {
        return {
          isValid: false,
          errorMessage: `Backrest height is typically between ${MEASUREMENT_VALIDATION_RANGES.backrestHeight.min}" and ${MEASUREMENT_VALIDATION_RANGES.backrestHeight.max}"`,
        };
      }
      break;
  }

  return { isValid: true };
};

/**
 * Validate relationships between measurements
 * @param measurements Object containing related measurements
 * @returns Object with validation result and possible error message
 */
export const validateMeasurementRelationships = (
  measurements: Record<string, number>
): { isValid: boolean; errorMessage?: string } => {
  // Example: Validate sofa width vs cushion width
  if (measurements.sofaWidth && measurements.cushionWidth) {
    if (measurements.cushionWidth > measurements.sofaWidth) {
      return {
        isValid: false,
        errorMessage: 'Cushion width cannot be greater than sofa width',
      };
    }
  }

  // Example: Validate sofa depth vs cushion depth
  if (measurements.sofaDepth && measurements.cushionDepth) {
    if (measurements.cushionDepth > measurements.sofaDepth) {
      return {
        isValid: false,
        errorMessage: 'Cushion depth cannot be greater than sofa depth',
      };
    }
  }

  return { isValid: true };
}; 