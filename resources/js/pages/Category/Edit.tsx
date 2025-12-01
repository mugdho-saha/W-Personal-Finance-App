import AppLayout from '@/layouts/app-layout';
import { categories } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {ShieldAlert} from 'lucide-react';
import { route } from 'ziggy-js';

// Breadcrumbs for layout
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Categories',
        href: categories().url,
    },
];


interface Category {
    category_id: number,
    category_name: string,
    category_type: string,
    status: string,
}

interface props {
    category: Category
}
export default function Edit({ category }: props) {

    const { data, setData, put, processing, errors } = useForm({
        category_name: category.category_name,
        category_type: category.category_type,
        category_id: category.category_id,
        status: String(category.status)
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('categories.update', data.category_id));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Categories" />

            <div className="h-full gap-4 p-4">
                <form onSubmit={handleSubmit} className="max-w-sm mx-auto space-y-4">

                    {Object.keys(errors).length > 0 && (
                        <Alert>
                            <ShieldAlert />
                            <AlertTitle>Heads Up!</AlertTitle>
                            <AlertDescription>
                                <ul>
                                    {Object.entries(errors).map(([key, message]) => (
                                        <li key={key}>{message as string}</li>
                                    ))}
                                </ul>
                            </AlertDescription>
                        </Alert>
                    )}

                    <div>
                        <Label htmlFor="category-name">Category Name</Label>
                        <Input
                            type="text"
                            id="category-name"
                            value={data.category_name}
                            onChange={(e) => setData('category_name', e.target.value)}
                        />
                    </div>

                    <div>
                        <Label htmlFor="category-type">Category Type</Label>
                        <Select
                            value={data.category_type}
                            onValueChange={(value) => setData('category_type', value)}
                        >
                            <SelectTrigger id="category-type">
                                <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="income">Income</SelectItem>
                                <SelectItem value="expense">Expense</SelectItem>
                                <SelectItem value="both">Both</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <Label htmlFor="category-type">Category Status</Label>
                        <Select
                            value={data.status}
                            onValueChange={(value) => setData('status', value)}
                        >
                            <SelectTrigger id="category-status">
                                <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="1">Active</SelectItem>
                                <SelectItem value="0">Inactive</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <Button type="submit" disabled={processing}>
                        {processing ? "Updating..." : "Update Category"}
                    </Button>

                </form>
            </div>
        </AppLayout>
    );
}

