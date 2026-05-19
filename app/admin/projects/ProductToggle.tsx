"use client";

import { useTransition } from "react";
import { toggleProjectProduct } from "../actions";

export default function ProductToggle({
    projectId,
    isProduct,
    productType
}: {
    projectId: string;
    isProduct: boolean;
    productType: string | null;
}) {
    const [isPending, startTransition] = useTransition();

    const handleToggle = () => {
        startTransition(() => {
            toggleProjectProduct(projectId, !isProduct, productType || "WEB_PRODUCT");
        });
    };

    const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        startTransition(() => {
            toggleProjectProduct(projectId, isProduct, e.target.value);
        });
    };

    return (
        <div className="flex items-center gap-3">
            <button
                onClick={handleToggle}
                disabled={isPending}
                className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                    isProduct ? 'bg-green-500' : 'bg-[var(--border)]'
                }`}
            >
                <span
                    className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                        isProduct ? 'translate-x-5' : 'translate-x-1'
                    }`}
                />
            </button>
            <span className="text-[10px] uppercase font-bold text-[var(--muted-foreground)]">
                Is Product
            </span>

            {isProduct && (
                <select
                    value={productType || "WEB_PRODUCT"}
                    onChange={handleTypeChange}
                    disabled={isPending}
                    className="ml-2 bg-[var(--background)] border border-[var(--border)] text-[10px] uppercase p-1 text-[var(--foreground)]"
                >
                    <option value="WEB_PRODUCT" className="text-black">Web Product</option>
                    <option value="MOBILE_APP" className="text-black">Mobile App</option>
                </select>
            )}
        </div>
    );
}
