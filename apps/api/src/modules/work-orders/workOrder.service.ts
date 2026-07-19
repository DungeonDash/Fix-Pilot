import { Types } from "mongoose";

import { AssetModel } from "../assets/asset.model.js";
import { Customer } from "../customers/customer.model.js";

import { WorkOrderModel } from "./workOrder.model.js";
import type { WorkOrderDocument, WorkOrder } from "./workOrder.model.js";

import type {
    CreateWorkOrderDto,
    UpdateWorkOrderDto,
    WorkOrderQueryDto,
} from "./workOrder.validation.js";

export async function createWorkOrder(
    organizationId: string,
    clerkUserId: string,
    data: CreateWorkOrderDto
): Promise<WorkOrderDocument> {
    const customer = await Customer.findOne({
        _id: data.customerId,
        organizationId,
        isDeleted: false,
    });

    if (!customer) {
        throw new Error("Customer not found");
    }

    const asset = await AssetModel.findOne({
        _id: data.assetId,
        organizationId,
        isDeleted: false,
    });

    if (!asset) {
        throw new Error("Asset not found");
    }

    if (asset.customerId.toString() !== data.customerId) {
        throw new Error("Asset does not belong to the selected customer");
    }

    const latestWorkOrder = await WorkOrderModel.findOne({
        organizationId,
    })
        .sort({ createdAt: -1 })
        .select("workOrderNumber");

    let workOrderNumber = "WO-000001";

    if (latestWorkOrder?.workOrderNumber) {
        const current = Number(
            latestWorkOrder.workOrderNumber.replace("WO-", "")
        );

        workOrderNumber = `WO-${String(current + 1).padStart(6, "0")}`;
    }

    const workOrderData = {
        ...data,

        organizationId: new Types.ObjectId(organizationId),

        customerId: new Types.ObjectId(data.customerId),

        assetId: new Types.ObjectId(data.assetId),

        workOrderNumber,

        priority: data.priority ?? "medium",

        status: "open" as const,

        createdBy: clerkUserId,
    };

    const workOrder = await WorkOrderModel.create(workOrderData as any);

    return workOrder;
}

export async function listWorkOrders(
    organizationId: string,
    query: WorkOrderQueryDto
): Promise<{
    workOrders: WorkOrderDocument[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}> {
    const {
        page = 1,
        limit = 10,
        search,
        status,
        priority,
        customerId,
        assetId,
    } = query;

    const filter: any = {
        organizationId,
        isDeleted: false,
    };

    if (search) {
        filter.$or = [
            {
                title: {
                    $regex: search,
                    $options: "i",
                },
            },
            {
                workOrderNumber: {
                    $regex: search,
                    $options: "i",
                },
            },
        ];
    }

    if (status) {
        filter.status = status;
    }

    if (priority) {
        filter.priority = priority;
    }

    if (customerId) {
        filter.customerId = customerId;
    }

    if (assetId) {
        filter.assetId = assetId;
    }

    const skip = (page - 1) * limit;

    const [workOrders, total] = await Promise.all([
        WorkOrderModel.find(filter)
            .populate("customerId")
            .populate("assetId")
            .populate("assignedTechnicianId")
            .sort({
                createdAt: -1,
            })
            .skip(skip)
            .limit(limit),

        WorkOrderModel.countDocuments(filter),
    ]);

    return {
        workOrders,

        total,

        page,

        limit,

        totalPages: Math.ceil(total / limit),
    };
}

export async function getWorkOrderById(
    organizationId: string,
    workOrderId: string
): Promise<WorkOrderDocument> {
    const workOrder = await WorkOrderModel.findOne({
        _id: workOrderId,
        organizationId,
        isDeleted: false,
    })
        .populate("customerId")
        .populate("assetId")
        .populate("assignedTechnicianId");

    if (!workOrder) {
        throw new Error("Work order not found");
    }

    return workOrder;
}

export async function updateWorkOrder(
    organizationId: string,
    workOrderId: string,
    data: UpdateWorkOrderDto
): Promise<WorkOrderDocument> {
    const workOrder = await WorkOrderModel.findOne({
        _id: workOrderId,
        organizationId,
        isDeleted: false,
    });

    if (!workOrder) {
        throw new Error("Work order not found");
    }

    const assetId = (data as { assetId?: string }).assetId;

    if (assetId) {
        const asset = await AssetModel.findOne({
            _id: assetId,
            organizationId,
            isDeleted: false,
        });

        if (!asset) {
            throw new Error("Asset not found");
        }

        const customerId = workOrder.customerId.toString();

        if (asset.customerId.toString() !== customerId) {
            throw new Error(
                "Asset does not belong to the selected customer"
            );
        }
    }

    Object.assign(workOrder, data);

    await workOrder.save();

    return workOrder.populate([
        "customerId",
        "assetId",
        "assignedTechnicianId",
    ]);
}

export async function deleteWorkOrder(
    organizationId: string,
    workOrderId: string
): Promise<void> {
    const workOrder = await WorkOrderModel.findOne({
        _id: workOrderId,
        organizationId,
        isDeleted: false,
    });

    if (!workOrder) {
        throw new Error("Work order not found");
    }

    workOrder.isDeleted = true;

    await workOrder.save();
}