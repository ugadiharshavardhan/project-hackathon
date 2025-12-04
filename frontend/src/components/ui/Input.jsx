import React from 'react';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';

const Input = ({
  label,
  name,
  type = 'text',
  placeholder = '',
  value,
  onChange,
  error = null,
  success = null,
  className = '',
  disabled = false,
  helperText = '',
  ...props
}) => {
  const hasError = !!error;
  const hasSuccess = !!success && !hasError;
  
  return (
    <div className={`space-y-1 ${className}`}>
      {label && (
        <label htmlFor={name} className={`block text-sm font-medium ${hasError ? 'text-red-600' : 'text-gray-700'}`}>
          {label}
        </label>
      )}
      <div className="relative rounded-md shadow-sm">
        <input
          type={type}
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={`block w-full rounded-lg border ${
            hasError
              ? 'border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500 pr-10'
              : hasSuccess
              ? 'border-green-300 text-green-900 placeholder-green-300 focus:outline-none focus:ring-green-500 focus:border-green-500 pr-10'
              : 'border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500'
          } px-4 py-3 text-base transition duration-200 ${disabled ? 'bg-gray-50' : ''}`}
          placeholder={placeholder}
          aria-invalid={hasError ? 'true' : 'false'}
          aria-describedby={hasError ? `${name}-error` : undefined}
          {...props}
        />
        {hasError && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <XCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
          </div>
        )}
        {hasSuccess && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <CheckCircleIcon className="h-5 w-5 text-green-500" aria-hidden="true" />
          </div>
        )}
      </div>
      {hasError && (
        <p className="mt-1 text-sm text-red-600" id={`${name}-error`}>
          {error}
        </p>
      )}
      {helperText && !hasError && (
        <p className="mt-1 text-xs text-gray-500">{helperText}</p>
      )}
    </div>
  );
};

export default Input;
