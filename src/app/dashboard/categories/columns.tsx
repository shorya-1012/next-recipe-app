"use client"

import { ColumnDef } from "@tanstack/react-table"

export type categoryDetails = {
    name: string;
}

export const columns: ColumnDef<categoryDetails>[] = [
    {
        accessorKey: "name",
        header: "Category Name"
    },
]