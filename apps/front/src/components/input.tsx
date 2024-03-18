import { DetailedHTMLProps, InputHTMLAttributes } from "react";

export default function Input(props: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) {
    return <input {...props} className={`p-2 px-3 border border-gray-400 rounded bg-gray-50 outline-none ${props.className}`}/>;
}