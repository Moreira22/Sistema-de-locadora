import { toast } from "@/components/ui/use-toast";

export const sucesso = (entidade: string) =>
    toast({
        title: "Sucesso!",
        description: `${entidade} cadastrado com sucesso.`,
    });

export const erro = (entidade: string) =>
    toast({
        title: "Erro",
        description: `Ocorreu um erro no ${entidade}.`,
        variant: "destructive",
    });
export const sucessoPut = (entidade: string) =>
    toast({
        title: "Sucesso!",
        description: `${entidade} Editado com sucesso.`,
    });

export const erroPut = (entidade: string) =>
    toast({
        title: "Erro",
        description: `Ocorreu um erro ao Editar ${entidade}.`,
        variant: "destructive",
    });

export const sucessoDelete = (entidade: string) =>
    toast({
        title: "Sucesso!",
        description: `${entidade} Deletado com sucesso.`,
    });

export const erroDelete = (entidade: string) =>
    toast({
        title: "Erro",
        description: `Ocorreu um erro ao Deletar ${entidade}.`,
        variant: "destructive",
    });
