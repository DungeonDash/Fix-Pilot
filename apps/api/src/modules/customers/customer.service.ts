// import type { FilterQuery } from "mongoose";

import { Customer } from "./customer.model.js";
import type { CustomerDocument } from "./customer.model.js";

import type {
    CreateCustomerDto,
    UpdateCustomerDto,
    CustomerQueryDto,
} from "./customer.validation.js";

export async function createCustomer(
    organizationId: string,
    clerkUserId: string,
    data: CreateCustomerDto
): Promise<CustomerDocument> {
    const customer = await Customer.create({
        ...data,
        organizationId,
        createdBy: clerkUserId,
    });

    return customer;
}

export async function getCustomerById(
    customerId: string,
    organizationId: string
) {
    return Customer.findOne({
        _id: customerId,
        organizationId,
        isDeleted: false,
    });
}

export async function listCustomers(
    organizationId: string,
    query: CustomerQueryDto
) {
    const {
        page,
        limit,
        search,
    } = query;

    const filter: {
        organizationId: string;
        isDeleted: boolean;
        $or?: {
            name?: {
                $regex: string;
                $options: string;
            };
            email?: {
                $regex: string;
                $options: string;
            };
            phone?: {
                $regex: string;
                $options: string;
            };
        }[];
    } = {
        organizationId,
        isDeleted: false,
    };

    if (search) {
        filter.$or = [
            {
                name: {
                    $regex: search,
                    $options: "i",
                },
            },
            {
                email: {
                    $regex: search,
                    $options: "i",
                },
            },
            {
                phone: {
                    $regex: search,
                    $options: "i",
                },
            },
        ];
    }

    const [customers, total] =
        await Promise.all([
            Customer.find(filter)
                .sort({
                    createdAt: -1,
                })
                .skip((page - 1) * limit)
                .limit(limit),

            Customer.countDocuments(filter),
        ]);

    return {
        data: customers,

        pagination: {
            page,
            limit,
            total,

            totalPages: Math.ceil(
                total / limit
            ),
        },
    };
}

export async function updateCustomer(
    customerId: string,
    organizationId: string,
    clerkUserId: string,
    data: UpdateCustomerDto
) {
    return Customer.findOneAndUpdate(
        {
            _id: customerId,
            organizationId,
            isDeleted: false,
        },
        {
            ...data,
            updatedBy: clerkUserId,
        },
        {
            new: true,
            runValidators: true,
        }
    );
}

export async function deleteCustomer(
    customerId: string,
    organizationId: string
) {
    return Customer.findOneAndUpdate(
        {
            _id: customerId,
            organizationId,
            isDeleted: false,
        },
        {
            isDeleted: true,
        },
        {
            new: true,
        }
    );
}