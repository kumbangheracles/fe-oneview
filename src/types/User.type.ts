export interface UserProperties {
  _id?: string;
  fullName?: string;
  username?: string;
  email?: string;
  password?: string | undefined;
  confirmPassword?: string | undefined;
  role?: string;
  profilePicture?: string;
  isActive?: boolean;
  activationCode?: string;
  phoneNumber?: string;
  provider?: "local" | "google";
  providerId?: string;
  avatar?: string;
  googleId?: string;
}

export const initialUser: UserProperties = {
  fullName: "",
  username: "",
  email: "",
  password: undefined,
  confirmPassword: undefined,
  role: "",
  profilePicture: "",
  isActive: false,
  activationCode: "",
  phoneNumber: "",
  provider: "local",
  providerId: "",
  avatar: "",
  googleId: "",
};
