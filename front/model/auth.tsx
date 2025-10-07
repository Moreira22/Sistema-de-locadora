export interface Auth {
    username: string,
    password: string,
}
export interface AuthUser {
    usuario: User,
}
export interface User {
        id: number,
        login: string,
        nome: string,
        perfilDesc: string,
        perfilId: number,
}
export interface UpdateSenha {
    id: number,
    senha: string,
}
