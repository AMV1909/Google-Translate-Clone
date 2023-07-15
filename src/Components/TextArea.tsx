import { Form } from "react-bootstrap";
import { SectionType } from "../types.d";

type Props = {
    type: SectionType;
    loading?: boolean;
    value: string;
    onChange: (value: string) => void;
};

const commonStyles = { border: 0, height: "200px", resize: "none" };

const getPlaceholder = ({
    type,
    loading,
}: {
    type: SectionType;
    loading?: boolean;
}) => {
    if (type === SectionType.From) return "Introducir texto";
    if (loading === true) return "Cargando...";

    return "Traducción";
};

export const TextArea = ({ type, loading, value, onChange }: Props) => {
    const styles =
        type === SectionType.From
            ? { ...commonStyles, autoFocus: true }
            : { ...commonStyles, backgroundColor: "#F5F5F5" };

    return (
        <Form.Control
            as="textarea"
            autoFocus={type === SectionType.From}
            placeholder={getPlaceholder({ type, loading })}
            disabled={type === SectionType.To}
            style={styles}
            value={value}
            onChange={(e) => onChange(e.currentTarget.value)}
        />
    );
};
