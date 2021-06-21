import { ValidationError } from "yup";

interface Errors{
    [key: string]: string;

}
export default function getValidationErrors(err: ValidationError): Errors{
    const valErros: Errors = {};

    err.inner.forEach((error) => {
        valErros[error.path] = error.message;
    });

    return valErros;
}