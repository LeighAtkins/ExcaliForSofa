/**
 * ExcaliForSofa - Core Application Types
 */

/**
 * Configuration options for initializing the ExcaliForSofa application
 */
export interface AppProps {
  /** The DOM element where the app will be mounted */
  container: HTMLElement;
  /** Initial mode for measurements (imperial or metric) */
  initialMeasurementUnit?: 'imperial' | 'metric';
  /** Whether to enable production features */
  enableProductionFeatures?: boolean;
  /** Whether to enable guided measurement wizards */
  enableGuidedMeasurement?: boolean;
  /** Language for the UI */
  language?: string;
  /** Callback when initialization is complete */
  onInit?: () => void;
}

/**
 * Represents a measurement value with both imperial and metric representations
 */
export interface MeasurementValue {
  /** Value in inches (can be fractional) */
  imperialValue: string;
  /** Value in centimeters (with one decimal precision) */
  metricValue: string;
  /** The raw numerical value in the primary unit system */
  rawValue: number;
  /** Whether imperial is the primary unit */
  isPrimaryImperial: boolean;
}

/**
 * Types of sofa measurements
 */
export enum MeasurementType {
  LENGTH = 'length',
  WIDTH = 'width',
  HEIGHT = 'height',
  DEPTH = 'depth',
  CIRCUMFERENCE = 'circumference',
  DIAGONAL = 'diagonal',
  CUSTOM = 'custom',
}

/**
 * Sofa part categories for tagging
 */
export enum SofaPartType {
  FRAME = 'frame',
  CUSHION = 'cushion',
  ARMREST = 'armrest',
  BACKREST = 'backrest',
  SEAT = 'seat',
  SKIRT = 'skirt',
  LEG = 'leg',
  ZIPPER = 'zipper',
  SEAM = 'seam',
  OTHER = 'other',
}

/**
 * Production annotation types
 */
export enum AnnotationType {
  SEAM = 'seam',
  ZIPPER = 'zipper',
  VELCRO = 'velcro',
  FOLD = 'fold',
  STRETCH = 'stretch',
  FABRIC_DIRECTION = 'fabric-direction',
  SPECIAL_INSTRUCTION = 'special-instruction',
}

/**
 * User roles in the system
 */
export enum UserRole {
  CUSTOMER = 'customer',
  SERVICE_TEAM = 'service-team',
  PRODUCTION_TEAM = 'production-team',
  ADMIN = 'admin',
}

/**
 * Status of a sofa measurement project
 */
export enum ProjectStatus {
  DRAFT = 'draft',
  REVIEW = 'review',
  APPROVED = 'approved',
  IN_PRODUCTION = 'in-production',
  COMPLETED = 'completed',
} 