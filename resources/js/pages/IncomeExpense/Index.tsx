import AppLayout from '@/layouts/app-layout';
import { categories } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import {Head, Link, useForm, usePage} from '@inertiajs/react';
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
import { Textarea } from "@/components/ui/textarea"

// Breadcrumbs for layout
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Income-Expense',
        href: route('income-expense.index'),
    },
];


interface Category {
    category_id: number,
    category_name: string,
    category_type: string,
    status: number
}

interface Entries {
    income_expense_id: number,
    category_id: number,
    date: string,
    amount: number,
    note: string,
    category_name: string,
}

interface PageProps{
    flash: {
        success?: string
    },
    categories: Category[],
    entries: Entries[],
}
export default function Index() {
    const [showModal, setShowModal] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const { categories, entries, flash } = usePage().props;

    // Inertia useForm
    const { data, setData, post, processing, errors, reset } = useForm({
        date: '',
        type: '',
        amount: '',
        note: '',
        category_id: ''
    });

    // Handle form submit
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        post(route('income-expense.store'), {
            onSuccess: () => {
                reset();           // Reset form fields
                setShowModal(false); // Close modal
                setSuccessMessage('Income-Expense Entry added successfully!');
            }
        });
    };

    const handleDelete = (income_expense_id:number) => {
        if(confirm(`Do you want to delete this entry?`)){
            post(route('income-expense.destroy',income_expense_id),{
                onSuccess: () => {
                    setSuccessMessage('Income-Expense deleted successfully!');
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

                {flash?.success && (
                    <Alert className="mb-4">
                        <ShieldAlert />
                        <AlertTitle>Success</AlertTitle>
                        <AlertDescription>{flash.success}</AlertDescription>
                    </Alert>
                )}

                {/* Button to open modal */}
                <Button onClick={() => setShowModal(true)}>
                    Add Income/Expense
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
                            <Label htmlFor="category-name">Date</Label>
                            <Input
                                type="date"
                                id="category-name"
                                value={data.date}
                                onChange={(e) => setData('date', e.target.value)}
                            />
                        </div>

                        {/* Category Type */}
                        <div>
                            <Label htmlFor="category-type">Select Category</Label>

                            <Select
                                value={String(data.category_id)}
                                onValueChange={(value) => setData('category_id', Number(value))}
                            >
                                <SelectTrigger id="category-type">
                                    <SelectValue placeholder="Select category" />
                                </SelectTrigger>

                                <SelectContent>
                                    {categories.map((cat) => (
                                        <SelectItem
                                            key={cat.category_id}
                                            value={String(cat.category_id)}
                                        >
                                            {cat.category_name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>


                        {/*type*/}
                        <div>
                            <Label htmlFor="category-type">Category Type</Label>
                            <Select
                                value={data.type}
                                onValueChange={(value) => setData('type', value)}
                            >
                                <SelectTrigger id="category-type">
                                    <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="income">Income</SelectItem>
                                    <SelectItem value="expense">Expense</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* amount */}
                        <div>
                            <Label htmlFor="amount">Amount</Label>
                            <Input
                                type="text"
                                id="amount"
                                value={data.amount}
                                onChange={(e) => setData('amount', e.target.value)}
                            />
                        </div>

                        {/* note */}
                        <div>
                            <Label htmlFor="note">Note</Label>
                            <Textarea
                                placeholder="Enter Note Here"
                                id="note"
                                value={data.note}
                                onChange={(e) => setData('note', e.target.value)}
                            />
                        </div>

                        {/* Submit Button */}
                        <Button type="submit" disabled={processing}>
                            {processing ? "Saving..." : "Add Entry"}
                        </Button>
                    </form>
                </Modal>


                <div className='m-4'>
                    {entries.length > 0 && (
                        <Table>
                            <TableCaption>A list of your recent income expense entries.</TableCaption>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[100px]">Sl No</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead>Category</TableHead>
                                    <TableHead>Note</TableHead>
                                    <TableHead>Amount</TableHead>
                                    <TableHead className="text-right">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {entries.map((entry, index) => (
                                    <TableRow key={entry.id}>
                                        <TableCell className="font-medium">{index + 1}</TableCell>
                                        <TableCell>{new Date(entry.date).toLocaleDateString('en-GB')}</TableCell>
                                        <TableCell>{entry.type}</TableCell>
                                        <TableCell>{entry.category?.category_name}</TableCell>
                                        <TableCell>{entry.note}</TableCell>
                                        <TableCell>{entry.amount}</TableCell>
                                        <TableCell className="text-right">
                                            <Link href={route('categories.edit',entry.income_expense_id)}>
                                                <Button className='bg-amber-500 hover:bg-amber-700 me-2'>
                                                    <Pencil></Pencil>
                                                </Button>
                                            </Link>

                                            <Button onClick={()=> handleDelete(entry.income_expense_id)} className='bg-red-500 hover:bg-red-700'>
                                                <Trash2></Trash2>
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
