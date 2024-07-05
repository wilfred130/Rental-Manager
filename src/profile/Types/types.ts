import { Role } from "src/Typeorm/Entities/Roles.enum";

export type CreateProfileParams = {
    firstName: string;
    lastName: string;
    profileImage?: string;
    physicalAddress: string;
    dob: Date;
    socialMediaHandles?: string[];
    role: Role;
  };


export type UpdateProfileParams = {
    firstName: string;
    lastName: string;
    profileImage?: string;
    physicalAddress: string;
    dob: Date;
    socialMediaHandles?: string[];
    role: Role;
  };

  