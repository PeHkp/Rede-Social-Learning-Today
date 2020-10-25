export interface IsRegisterInterface {
  data: {
    message: string;
    isRegisterEmail: boolean;
  };
}
export interface LoginInterface {
  data: {
    message: string;
    success: boolean;
    id?: number;
  };
}
export interface CadastroInterface {
  data: {
    message: string;
    success: boolean;
  };
}
export interface tokenGenerateInterface {
  data: {
    message: string;
    success: boolean;
    tokenChallenger: string;
  };
}
