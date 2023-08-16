import { useFormik } from "formik";
import { Fragment, FunctionComponent, useEffect, useState } from "react";
import * as Yup from "yup";

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

const Field = (props: any) => {
  return <TextField {...props} />;
};

const Step = (props: any) => {
  const fields = props.fields;
  console.log(props);

  const formik = useFormik({
    initialValues: fields.reduce((acc: any, f) => {
      acc[f.key] = "";
      return acc;
    }, {}) as any,
    onSubmit: (values) => {
      props.onNext(values);
    },
    validationSchema: Yup.object(
      fields.reduce((acc, field) => {
        let validation = Yup.string();

        field.min && (validation = validation.min(field.min));
        field.required && (validation = validation.required());

        acc[field.key] = validation;

        return acc;
      }, {} as any)
    ),
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
      {props.steps.map((step: any, index: number) => (
        <Step
          active={activeStep === index + 1}
          onNext={onNext}
          title={step.title}
          fields={step.fields}
        />
      ))}
    </Fragment>
  );
};

const steps = [
  {
    title: "Basic Information",
    id: "basic-info",
    fields: [
      {
        type: "text",
        label: "First Name",
        required: true,
        key: "firstName",
        min: 4,
      },
      {
        type: "text",
        label: "Last Name",
        required: true,
        key: "lastName",
        min: 2,
      },
    ],
  },
  {
    title: "Credentials",
    id: "cred-info",
    fields: [
      {
        type: "email",
        label: "Email Address",
        required: true,
        key: "email",
      },
      {
        type: "password",
        label: "Password",
        required: true,
        key: "password",
        min: 8,
      },
    ],
  },
  {
    title: "Address Information",
    id: "address-info",
    fields: [
      {
        type: "text",
        label: "State",
        required: true,
        key: "state",
        min: 2,
      },
      {
        type: "text",
        label: "City",
        required: true,
        key: "city",
        min: 2,
      },
    ],
  },
];

function App() {
  const [done, setDone] = useState(false);
  const [values, setValues] = useState([]);

  const onDone = (values: any) => {
    setValues(values);
    setDone(true);
  };
  return (
    <Fragment>
      {done ? (
        <pre>{JSON.stringify(values, null, 4)}</pre>
      ) : (
        <Steps steps={steps} onDone={onDone} />
      )}
    </Fragment>
  );
}

export default App;

type TTextField = FunctionComponent<
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > & {
    label?: string;
    error?: string;
  }
>;
