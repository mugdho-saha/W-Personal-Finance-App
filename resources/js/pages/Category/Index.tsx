import AppLayout from '@/layouts/app-layout';
import { categories } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import Modal from "@/components/Modal";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {ShieldAlert, Pencil} from 'lucide-react';
import { route } from 'ziggy-js';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Trash2 } from 'lucide-react';

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
    status: number
}

interface PageProps{
    flash: {
        message?: string
    },
    categories: Category[]
}
export default function Index() {
    const [showModal, setShowModal] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const { categories, flash } = usePage().props;

    // Inertia useForm
    const { data, setData, post, processing, errors, reset } = useForm({
        category_name: '',
        category_type: ''
    });

    // Handle form submit
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        post(route('categories.store'), {
            onSuccess: () => {
                reset();           // Reset form fields
                setShowModal(false); // Close modal
                setSuccessMessage('Category added successfully!');
            }
        });
    };

    const handleDelete = (category_id:number, category_name:string) => {
        if(confirm(`Do you want to delete ${category_name}?`)){
            post(route('categories.destroy',category_id),{
                onSuccess: () => {
                    setSuccessMessage('Category deleted successfully!');
                }
            })
        }
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Categories" />

            <div className="h-full gap-4 p-4">

                {/* Flash success message */}
                {successMessage && (
                    <Alert className="mb-4">
                        <ShieldAlert />
                        <AlertTitle>Success</AlertTitle>
                        <AlertDescription>{successMessage}</AlertDescription>
                    </Alert>
                )}

                {/* Button to open modal */}
                <Button onClick={() => setShowModal(true)}>
                    Add Category
                </Button>

                {/* Modal */}
                <Modal show={showModal} onClose={() => setShowModal(false)}>
                    <form onSubmit={handleSubmit} className="max-w-sm mx-auto space-y-4">

                        {/* Display validation errors */}
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

                        {/* Category Name */}
                        <div>
                            <Label htmlFor="category-name">Category Name</Label>
                            <Input
                                type="text"
                                id="category-name"
                                placeholder="Category Name"
                                value={data.category_name}
                                onChange={(e) => setData('category_name', e.target.value)}
                            />
                        </div>

                        {/* Category Type */}
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

                        {/* Submit Button */}
                        <Button type="submit" disabled={processing}>
                            {processing ? "Saving..." : "Add Category"}
                        </Button>
                    </form>
                </Modal>


                <div className='m-4'>
                    {categories.length > 0 && (
                        <Table>
                            <TableCaption>A list of your recent categories.</TableCaption>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[100px]">Sl No</TableHead>
                                    <TableHead>Category Name</TableHead>
                                    <TableHead>Category Type</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {categories.map((category, index) => (
                                    <TableRow key={category.id}>
                                        <TableCell className="font-medium">{index + 1}</TableCell>
                                        <TableCell>{category.category_name}</TableCell>
                                        <TableCell>{category.category_type}</TableCell>
                                        <TableCell>{category.status}</TableCell>
                                        <TableCell className="text-right">
                                            <Button onClick={()=> handleDelete(category.category_id, category.category_name)} className='bg-red-500 hover:bg-red-700'>
                                                <Trash2></Trash2>
                                            </Button>
                                            <Button className='bg-amber-500 hover:bg-amber-700 ms-1'>
                                                <Pencil></Pencil>
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}

                            </TableBody>
                        </Table>
                    )}
                </div>


            </div>
        </AppLayout>
    );
}
