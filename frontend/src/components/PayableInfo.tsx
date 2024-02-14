import { BASE_URL } from "@/contants";
import { currency } from "@/helpers/currency";
import { formatDate } from "@/helpers/format-date";
import Link from "next/link";
import { notFound } from "next/navigation";

const PayableInfo = async ({ token, id }: {
    token: string | null, id: string
}) => {

    const res = await fetch(`${BASE_URL}/integrations/payable/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    const payable = await res.json();

    if (!payable.id) {
        notFound();
    }

    return (
        <div className="w-full">
            <div className="flex items-center justify-between py-4">
                <p className="font-bold">Valor</p>
                <p>{currency(payable.value)}</p>
            </div>
            <div className="flex items-center justify-between py-4">
                <p className="font-bold">Cedente</p>
                <Link
                    href={`/assignors/${payable.assignor.id}`}
                    className="underline text-blue-600"
                >{payable.assignor.name}</Link>
            </div>
            <div className="flex items-center justify-between py-4">
                <p className="font-bold">Data de emissão</p>
                <p>{formatDate(payable.emissionDate)}</p>
            </div>
        </div>
    )
}

export default PayableInfo;