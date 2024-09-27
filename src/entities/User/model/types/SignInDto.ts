export interface RegisterDto {
	password: string;
	username: string;
	email: string;
	fullName: string;
}

export interface LoginDto {
	password: string;
	username: string;
}
