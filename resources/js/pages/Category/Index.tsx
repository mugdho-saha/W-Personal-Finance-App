import AppLayout from '@/layouts/app-layout';
import {categories} from '@/routes';
import { type BreadcrumbItem } from '@/types';
import {Head, router, useForm} from '@inertiajs/react';
import Modal from "../../components/Modal";
import React, {useState} from "react";
import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import { route } from 'ziggy-js';
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Categories',
        href: categories().url,
    },
];

export default function index() {
    const [showModal, setShowModal] = useState(false);
    const {data, setData, post, processing, errors } = useForm({
        category_name: '',
        category_type:''
    })

    const handleSubmit = (e: React.FormEvent)=> {
        e.preventDefault();
        post(route('categories.store'));
    }
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Categories" />
            <div className="h-full gap-4 p-4">
                <Button onClick={() => setShowModal(true)}>
                    Add Category
                </Button>

                <Modal show={showModal} onClose={() => setShowModal(false)}>
                    <form onSubmit={handleSubmit} className="max-w-sm mx-auto space-y-4">
                        <div>
                            <Label htmlFor="category-name" className="block mb-2.5 text-sm font-medium text-heading">Category Name</Label>
                            <Input type="text" id="category-name"
                                   className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-2.5 py-2 shadow-xs placeholder:text-body"
                                   placeholder="Category Name" value={data.category_name}
                                   onChange={(e) => setData('category_name', e.target.value)}
                                   required/>
                        </div>
                        <div>
                            <Label htmlFor="category-type">Category Type</Label>
                            <Select
                                value={data.category_type}
                                onValueChange={(value) => setData("category_type", value)}
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
                            <Button type={"submit"}>Add Category</Button>
                        </div>
                    </form>
                </Modal>
            </div>
        </AppLayout>
    );
}
