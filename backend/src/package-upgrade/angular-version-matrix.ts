export interface AngularVersionInfo {
  angular: string;
  cli: string;
  material: string;
  cdk: string;
  typescript: string;
  rxjs: string;
  zone: string;
}

export const ANGULAR_VERSION_MATRIX: Record<string, AngularVersionInfo> = {

  '8': {
    angular: '~8.2.14',
    cli: '~8.3.29',
    material: '~8.2.3',
    cdk: '~8.2.3',
    typescript: '~3.5.3',
    rxjs: '~6.5.5',
    zone: '~0.9.1'
  },

  '9': {
    angular: '~9.1.13',
    cli: '~9.1.15',
    material: '~9.2.4',
    cdk: '~9.2.4',
    typescript: '~3.8.3',
    rxjs: '~6.5.5',
    zone: '~0.10.3'
  },

  '10': {
    angular: '~10.2.5',
    cli: '~10.2.4',
    material: '~10.2.7',
    cdk: '~10.2.7',
    typescript: '~3.9.10',
    rxjs: '~6.6.7',
    zone: '~0.10.3'
  },

  '11': {
    angular: '~11.2.14',
    cli: '~11.2.19',
    material: '~11.2.13',
    cdk: '~11.2.13',
    typescript: '~4.1.6',
    rxjs: '~6.6.7',
    zone: '~0.11.4'
  },

  '12': {
    angular: '~12.2.17',
    cli: '~12.2.18',
    material: '~12.2.13',
    cdk: '~12.2.13',
    typescript: '~4.3.5',
    rxjs: '~6.6.7',
    zone: '~0.11.8'
  },

  '13': {
    angular: '~13.4.0',
    cli: '~13.3.11',
    material: '~13.3.9',
    cdk: '~13.3.9',
    typescript: '~4.6.4',
    rxjs: '~7.4.0',
    zone: '~0.11.8'
  },

  '14': {
    angular: '~14.3.0',
    cli: '~14.2.13',
    material: '~14.2.7',
    cdk: '~14.2.7',
    typescript: '~4.8.4',
    rxjs: '~7.5.7',
    zone: '~0.11.8'
  },

  '15': {
    angular: '~15.2.10',
    cli: '~15.2.11',
    material: '~15.2.9',
    cdk: '~15.2.9',
    typescript: '~4.9.5',
    rxjs: '~7.8.0',
    zone: '~0.12.0'
  },

  '16': {
    angular: '^16.2.12',
    cli: '^16.2.12',
    material: '^16.2.12',
    cdk: '^16.2.12',
    typescript: '~5.1.6',
    rxjs: '^7.8.1',
    zone: '~0.13.3'
  },

  '17': {
    angular: '^17.3.12',
    cli: '^17.3.12',
    material: '^17.3.10',
    cdk: '^17.3.10',
    typescript: '~5.2.2',
    rxjs: '^7.8.1',
    zone: '~0.14.3'
  },

  '18': {
    angular: '^18.2.14',
    cli: '^18.2.14',
    material: '^18.2.14',
    cdk: '^18.2.14',
    typescript: '~5.4.5',
    rxjs: '^7.8.1',
    zone: '~0.14.10'
  },

  '19': {
    angular: '^19.2.15',
    cli: '^19.2.15',
    material: '^19.2.15',
    cdk: '^19.2.15',
    typescript: '~5.6.3',
    rxjs: '^7.8.2',
    zone: '~0.15.0'
  },

  '20': {
    angular: '^20.0.0',
    cli: '^20.0.0',
    material: '^20.0.2',
    cdk: '^20.0.2',
    typescript: '~5.8.2',
    rxjs: '^7.8.2',
    zone: '~0.15.1'
  }

};