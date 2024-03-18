import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

export default function Button(props: DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) {
    return <button {...props} className="p-2 px-3 border border-gray-400 rounded bg-gray-50">{props.children}</button>;
}