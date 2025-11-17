"use client";

import { useState } from "react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ListCollapse } from "lucide-react";

interface Column<T> {
    label: string;
    key: keyof T | string;
    className?: string;
}

interface TableSociosProps<T> {
    columns: Column<T>[];
    data: T[];
    actions?: (item: T) => React.ReactNode;
    renderDependentes: (item: T) => React.ReactNode;
}

export function TableClientes<T>({ columns, data, actions, renderDependentes }: TableSociosProps<T>) {
    const [expandedId, setExpandedId] = useState<number | null>(null);

    const toggleExpand = (id: number) => {
        setExpandedId(prev => (prev === id ? null : id));
    };

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
                    {data.map((item: any) => (
                        <>
                            {/* Linha principal */}
                            <TableRow key={item.id}>
                                {columns.map((col) => (
                                    <TableCell key={String(col.key)}>
                                        {
                                            col.key.includes(".")
                                                ? col.key.split(".").reduce((obj, key) => obj?.[key], item)
                                                : item[col.key]
                                        }
                                    </TableCell>
                                ))}

                                {actions && (
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">

                                            {/* Botão de expandir */}
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => toggleExpand(item.id)}
                                            >
                                                <ListCollapse className="h-4 w-4" />
                                            </Button>

                                            {actions(item)}
                                        </div>
                                    </TableCell>
                                )}
                            </TableRow>

                            {/* Linha expandida */}
                            {expandedId === item.id && (
                                <TableRow className="bg-muted/40">
                                    <TableCell colSpan={columns.length + 1}>
                                        {renderDependentes(item)}
                                    </TableCell>
                                </TableRow>
                            )}
                        </>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
