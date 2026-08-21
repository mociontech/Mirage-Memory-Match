import { useState } from "react";
import { useFlow } from "../../app/FlowMachine";
import { generateId } from "../../services/idService";
import { Button } from "../../components/Button";
import { TextField } from "../../components/TextField";
import iconPerson from "../../assets/images/icon-person.svg";
import iconEnvelope from "../../assets/images/icon-envelope.svg";
import { ScreenShell } from "../ScreenShell";
import styles from "./Register.module.css";

/** Name + email capture, or a link into RegisterId to resume with an existing ID. */
export function Register() {
  const { navigate, setSession } = useFlow();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const canSubmit = name.trim().length > 0 && email.trim().length > 0;

  const handleSubmit = () => {
    if (!canSubmit) return;
    setSession({ name: name.trim(), email: email.trim(), id: generateId() });
    navigate("idGenerated");
  };

  return (
    <ScreenShell
      actions={
        <>
          <Button onClick={handleSubmit} disabled={!canSubmit}>
            Comenzar
          </Button>
          <button className={styles.link} onClick={() => navigate("registerId")}>
            ó Digita ID
          </button>
        </>
      }
    >
      <h1 className={styles.title}>REGISTRO</h1>
      <div className={styles.fields}>
        <TextField
          icon={<img src={iconPerson} alt="" />}
          placeholder="Nombre"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <TextField
          icon={<img src={iconEnvelope} alt="" />}
          placeholder="Correo"
          type="email"
          inputMode="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>
    </ScreenShell>
  );
}
