import Api from "@/server/server";
import {Auth, AuthUser, UpdateSenha} from "@/model/auth";
export const useAuth = () => {

    const postAuthUser = async (user: Auth): Promise<AuthUser | null> => {
        try {
            const response = await Api.post('/auth/authenticate', user);

            const authUser: AuthUser = response.data;

            // Salva o usuário no localStorage
            localStorage.setItem('usuario', JSON.stringify(authUser.usuario));

            return authUser;
        } catch (error) {
            console.error('Erro ao autenticar o usuário:', error);
            return null;
        }
    };
    const updateSenha = async (senha: UpdateSenha): Promise<void | null> => {
        try {
            await Api.put('/usuarios/updtSenha', senha);
            console.log('Senha atualizada com sucesso!');
        } catch (error) {
            console.error('Erro ao atualizar a senha do usuário:', error);
            return null;
        }
    };

    return{ postAuthUser, updateSenha };
};
