import { useState, useCallback } from 'react';

/**
 * Hook personalizado useForm (Paso 5)
 * Encapsula la lógica reutilizable de formularios, validaciones y estado de errores
 */
export function useForm(initialValues, validateFn) {
  const [values, setValues] = useState(initialValues);
  const [fieldErrors, setFieldErrors] = useState({});
  const [formError, setFormError] = useState(null);

  // Callback estabilizado para cambiar valores y filtrar campos específicos
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;

    if (name === 'telefono') {
      // Regla: teléfono solo permite números y espacios
      const cleaned = value.replace(/[^0-9\s]/g, '');
      setValues((prev) => ({ ...prev, [name]: cleaned }));
    } else {
      setValues((prev) => ({ ...prev, [name]: value }));
    }

    // Limpia el error del campo al escribir
    setFieldErrors((prev) => {
      if (prev[name]) {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      }
      return prev;
    });
  }, []);

  const setFieldValue = useCallback((name, val) => {
    setValues((prev) => ({ ...prev, [name]: val }));
  }, []);

  const resetForm = useCallback(() => {
    setValues(initialValues);
    setFieldErrors({});
    setFormError(null);
  }, [initialValues]);

  const handleSubmit = useCallback(
    (e, onSubmitSuccess) => {
      if (e && e.preventDefault) e.preventDefault();

      if (validateFn) {
        const { errors, summaryMessage } = validateFn(values);
        if (Object.keys(errors).length > 0) {
          setFieldErrors(errors);
          setFormError(summaryMessage || '⚠️ Complete los campos obligatorios correctamente');
          return false;
        }
      }

      setFieldErrors({});
      setFormError(null);
      if (onSubmitSuccess) {
        onSubmitSuccess(values);
      }
      return true;
    },
    [values, validateFn]
  );

  return {
    values,
    fieldErrors,
    formError,
    setFormError,
    handleChange,
    setFieldValue,
    resetForm,
    handleSubmit,
  };
}

export default useForm;

