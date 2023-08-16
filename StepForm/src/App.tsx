import { Fragment, FunctionComponent, useState } from "react";
import StepForm from "./components/StepForm";

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
      {
        type: "number",
        label: "age",
        required: true,
        key: "Age",
        min: 18,
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
  const [_steps, setSteps] = useState(steps);
  const [json, setJson] = useState(JSON.stringify(steps, null, 4));

  const onDone = (values: any) => {
    setValues(values);
    setDone(true);
  };

  const updateForms = () => {
    setSteps(JSON.parse(json));
  };

  return (
    <Fragment>
      <div className="row">
        <div className="col">
          {done ? (
            <pre>{JSON.stringify(values, null, 4)}</pre>
          ) : (
            <StepForm steps={_steps} onDone={onDone} />
          )}
        </div>

        <div className="col">
          <button className="btn btn-dark" onClick={updateForms}>
            Update Form
          </button>
          <hr />
          <div>
            <textarea
              className="form-control"
              cols={50}
              rows={100}
              onChange={(event) => {
                try {
                  setJson(event.target.value);
                } catch (error) {
                  console.log(error);
                }
              }}
              value={json}
            ></textarea>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
