"use client";

import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

interface Column<T> {
    label: string;
    key: keyof T | string;
    render?: (item: T) => React.ReactNode;
    className?: string;
}

interface DynamicTableProps<T> {
    columns: Column<T>[];
    data: T[];
    emptyMessage?: string;
    actions?: (item: T) => React.ReactNode;
}

export function DynamicTable<T>({ columns, data, emptyMessage = "Nenhum registro encontrado", actions }: DynamicTableProps<T>) {
    return (
        <div className="border rounded-lg bg-card">
            <Table>
                <TableHeader>
                    <TableRow>
                        {columns.map((col) => (
                            <TableHead key={col.label} className={col.className}>
                                {col.label}
                            </TableHead>
                        ))}

                        {actions && <TableHead className="text-right">Ações</TableHead>}
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {data.length > 0 ? (
                        data.map((item: T, index: number) => (
                            <TableRow key={index}>
                                {columns.map((col) => (
                                    <TableCell key={String(col.key)}>
                                        {col.render
                                            ? col.render(item)
                                            : // @ts-ignore: acessando chave dinâmica
                                            item[col.key]}
                                    </TableCell>
                                ))}

                                {actions && (
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            {actions(item)}
                                        </div>
                                    </TableCell>
                                )}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length + (actions ? 1 : 0)}
                                       className="text-center text-muted-foreground">
                                {emptyMessage}
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
