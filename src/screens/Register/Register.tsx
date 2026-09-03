import { useState } from "react";
import { useFlow } from "../../app/FlowMachine";
import { generateId, hasEmailPlayedLocally } from "../../services/idService";
import { Button } from "../../components/Button";
import { TextField } from "../../components/TextField";
import { Modal } from "../../components/Modal";
import modalStyles from "../../components/Modal/Modal.module.css";
import iconPerson from "../../assets/images/icon-person.svg";
import iconEnvelope from "../../assets/images/icon-envelope.svg";
import iconWarning from "../../assets/images/icon-warning.svg";
import { ScreenShell } from "../ScreenShell";
import styles from "./Register.module.css";

/** Name + email capture, or a link into RegisterId to resume with an existing ID. */
export function Register() {
  const { navigate, setSession } = useFlow();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [showAdvertencia, setShowAdvertencia] = useState(false);

  const canSubmit = name.trim().length > 0 && email.trim().length > 0;

  const handleSubmit = () => {
    if (!canSubmit) return;
    const trimmedEmail = email.trim();

    // Server-side dedupe (email + country + experience) is authoritative; this only
    // saves a participant from playing through the whole board before being rejected.
    if (hasEmailPlayedLocally(trimmedEmail)) {
      setShowAdvertencia(true);
      return;
    }

    setSession({ name: name.trim(), email: trimmedEmail, id: generateId() });
    navigate("idGenerated");
  };

  const handleDigitaId = () => {
    if (!canSubmit) return;
    const trimmedEmail = email.trim();

    if (hasEmailPlayedLocally(trimmedEmail)) {
      setShowAdvertencia(true);
      return;
    }

    // RegisterId only collects the ID itself — name/email must already be in the
    // session before navigating there, or the final submit goes out with no email.
    setSession({ name: name.trim(), email: trimmedEmail });
    navigate("registerId");
  };

  return (
    <ScreenShell
      actions={
        <>
          <Button onClick={handleSubmit} disabled={!canSubmit}>
            Comenzar
          </Button>
          <button className={styles.link} onClick={handleDigitaId} disabled={!canSubmit}>
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

      <Modal open={showAdvertencia} onClose={() => setShowAdvertencia(false)}>
        <img className={styles.warningIcon} src={iconWarning} alt="" aria-hidden="true" />
        <p className={modalStyles.text}>
          Parece que ya participaste en esta experiencia. ¡Gracias!
        </p>
      </Modal>
    </ScreenShell>
  );
}
