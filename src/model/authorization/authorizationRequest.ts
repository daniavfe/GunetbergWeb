export default class AuthorizationRequest {
	email: string;
	password: string;

	constructor (email: string, password: string) {
		this.email = email;
		this.password = password;
	}

	updateEmail (email: string): AuthorizationRequest {
		return new AuthorizationRequest(email, this.password);
	}

	updatePassword (password: string): AuthorizationRequest {
		return new AuthorizationRequest(this.email, password);
	}

	isCorrect (): boolean {
		return !!this.email && !!this.password;
	}
}
