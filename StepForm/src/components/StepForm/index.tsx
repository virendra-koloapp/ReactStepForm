import { useFormik } from "formik";
import { Fragment, FunctionComponent, useEffect, useState } from "react";
import * as Yup from "yup";

export default function StepForm(props) {
  return <Steps steps={props.steps} onDone={props.onDone} />;
}

const Steps = (props: any) => {
  const [activeStep, setActiveStep] = useState(1);
  const [finalValues, setFinalValues] = useState<any[]>([]);
  const totalSteps = props.steps.length;

  const onNext = (values: any) => {
    setFinalValues([...finalValues, values]);

    setActiveStep(activeStep + 1);
  };

  useEffect(() => {
    if (activeStep > totalSteps) {
      props.onDone(finalValues);
    }
  }, [activeStep]);

  return (
    <Fragment>
      =
      {props.steps.map((step: any, index: number) => (
        <Step
          active={activeStep === index + 1}
          onNext={onNext}
          title={`${activeStep}. ${step.title}`}
          fields={step.fields}
        />
      ))}
    </Fragment>
  );
};

type TTextField = FunctionComponent<
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > & {
    label?: string;
    error?: string;
  }
>;
type TTextSelect = FunctionComponent<
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  > & {
    label?: string;
    error?: string;
    options: {
      text: string;
      value: string;
    }[];
  }
>;

const TextField: TTextField = (props) => {
  return (
    <div className="form-group  mt-4">
      <label htmlFor="" className="form-label">
        {props.label}
      </label>
      <input
        className={`form-control ${props.error ? "is-invalid" : ""}`}
        {...props}
      />
      <div className="invalid-feedback">{props.error}</div>
    </div>
  );
};
const SelectElement: TTextSelect = ({ options, ...props }) => {
  return (
    <div className="form-group  mt-4">
      <label htmlFor="" className="form-label">
        {props.label}
      </label>
      <select
        className={`form-control ${props.error ? "is-invalid" : ""}`}
        {...props}
      >
        {options.map((option) => (
          <option value={option.value}>{option.text}</option>
        ))}
      </select>
      <div className="invalid-feedback">{props.error}</div>
    </div>
  );
};

const Field = (props: any) => {
  const defaultComponent = TextField;
  const components = {
    select: SelectElement,
  };

  console.log(props.type);
  const Component = components[props.type] || defaultComponent;

  return <Component {...props} />;
};

const createInitialFormValues = (fields: any[]) => {
  return fields.reduce((acc: any, f) => {
    acc[f.key] = "";
    return acc;
  }, {}) as any;
};

const createValidationSchema = (fields: any[]) => {
  return Yup.object(
    fields.reduce((acc, field) => {
      const type = field.type == "number" ? "number" : "string";

      let validation = Yup[type]();

      field.min && (validation = validation.min(field.min));
      field.required && (validation = validation.required());

      acc[field.key] = validation;

      return acc;
    }, {} as any)
  );
};

const Step = (props: any) => {
  const fields = props.fields;

  const formik = useFormik({
    initialValues: createInitialFormValues(fields),
    onSubmit: (values) => {
      props.onNext(values);
    },
    validationSchema: createValidationSchema(fields),
  });

  const hide = props.active;

  return (
    <div hidden={!hide} className="border p-4 rounded mt-4">
      <form onSubmit={formik.handleSubmit}>
        <h1>{props.title}</h1>
        <hr />
        {fields.map((field, index) => {
          return (
            <Field
              {...field}
              onChange={formik.handleChange}
              value={formik.values[field.key]}
              error={formik.touched[field.key] && formik.errors[field.key]}
              name={field.key}
              key={index}
            />
          );
        })}

        <div className="mt-4">
          <button type="submit" className="btn btn-success">
            Next Step
          </button>
        </div>
      </form>
    </div>
  );
};
