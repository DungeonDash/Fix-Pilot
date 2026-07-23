"use client";

import { useEffect } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useCustomerOptions } from "@/features/customers/hooks/use-customer-options";

import {
  assetSchema,
  defaultAssetValues,
  assetStatus,
  type AssetFormValues,
} from "../schemas/asset.schema";

interface AssetFormProps {
  defaultValues?: Partial<AssetFormValues>;

  submitLabel: string;

  isSubmitting?: boolean;

  onSubmit: (
    values: AssetFormValues
  ) => Promise<void> | void;
}

export function AssetForm({
  defaultValues,
  submitLabel,
  isSubmitting = false,
  onSubmit,
}: AssetFormProps) {
  const { data: customers = [] } =
    useCustomerOptions();

  const form = useForm<AssetFormValues>({
    resolver: zodResolver(assetSchema),

    defaultValues: {
      ...defaultAssetValues,
      ...defaultValues,
    },

    mode: "onChange",
  });

  useEffect(() => {
    form.reset({
      ...defaultAssetValues,
      ...defaultValues,
    });
  }, [defaultValues, form]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

          {/* Customer */}

          <FormField
            control={form.control}
            name="customerId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Customer *
                </FormLabel>

                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        placeholder="Select customer"
                      >
                        {customers.find(
                          (customer: any) =>
                            customer._id === field.value
                        )?.name}
                      </SelectValue>
                    </SelectTrigger>
                  </FormControl>

                  <SelectContent>
                    {customers.map((customer: any) => (
                      <SelectItem
                        key={customer._id}
                        value={customer._id}
                      >
                        {customer.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />

          {/* Status */}

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>

                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>

                  <SelectContent>
                    {assetStatus.map((status) => (
                      <SelectItem
                        key={status}
                        value={status}
                      >
                        {status.charAt(0).toUpperCase() +
                          status.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />

          {/* Asset Name */}

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Asset Name *
                </FormLabel>

                <FormControl>
                  <Input
                    placeholder="Dell Latitude 7420"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          {/* Asset Code */}

          <FormField
            control={form.control}
            name="assetCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Asset Code *
                </FormLabel>

                <FormControl>
                  <Input
                    placeholder="AST-1001"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          {/* Serial Number */}

          <FormField
            control={form.control}
            name="serialNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Serial Number
                </FormLabel>

                <FormControl>
                  <Input
                    placeholder="SN123456789"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          {/* Manufacturer */}

          <FormField
            control={form.control}
            name="manufacturer"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Manufacturer
                </FormLabel>

                <FormControl>
                  <Input
                    placeholder="Dell"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          {/* Model */}

          <FormField
            control={form.control}
            name="model"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Model</FormLabel>

                <FormControl>
                  <Input
                    placeholder="Latitude 7420"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          {/* Category */}

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>

                <FormControl>
                  <Input
                    placeholder="Laptop"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          {/* Location */}

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>

                <FormControl>
                  <Input
                    placeholder="Floor 2 • IT Room"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          {/* Purchase Date */}

          <FormField
            control={form.control}
            name="purchaseDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Purchase Date
                </FormLabel>

                <FormControl>
                  <Input
                    type="date"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          {/* Installation Date */}

          <FormField
            control={form.control}
            name="installationDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Installation Date
                </FormLabel>

                <FormControl>
                  <Input
                    type="date"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          {/* Warranty Expiry */}

          <FormField
            control={form.control}
            name="warrantyExpiry"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Warranty Expiry
                </FormLabel>

                <FormControl>
                  <Input
                    type="date"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          {/* QR Code */}

          <FormField
            control={form.control}
            name="qrCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>QR Code</FormLabel>

                <FormControl>
                  <Input
                    placeholder="QR-001"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          {/* Barcode */}

          <FormField
            control={form.control}
            name="barcode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Barcode</FormLabel>

                <FormControl>
                  <Input
                    placeholder="123456789012"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          {/* Notes */}

          <div className="md:col-span-2">
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes</FormLabel>

                  <FormControl>
                    <Textarea
                      rows={5}
                      placeholder="Additional asset information..."
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

        </div>

        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={
              isSubmitting ||
              !form.formState.isValid
            }
          >
            {isSubmitting
              ? "Saving..."
              : submitLabel}
          </Button>
        </div>
      </form>
    </Form>
  );
}