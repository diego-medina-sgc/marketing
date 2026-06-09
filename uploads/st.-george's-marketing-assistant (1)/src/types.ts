/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface UserInfo {
  name: string;
  campus: 'Quilmes' | 'North' | '';
  role: string;
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}

export type AppStep = 
  | 'identification' 
  | 'menu' 
  | 'option_a' 
  | 'option_b' 
  | 'option_c' 
  | 'option_d' 
  | 'option_e' 
  | 'option_f'
  | 'option_palette'
  | 'option_logos'
  | 'success';

export interface Template {
  name: string;
  url: string;
  previewUrl?: string;
  usage?: string;
  fields?: string[];
  variations?: { label: string; preview: string }[];
}
