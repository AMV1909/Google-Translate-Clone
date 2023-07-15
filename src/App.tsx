import { useEffect } from "react";
import { Container, Row, Col, Button, Stack } from "react-bootstrap";

import { useStore, useDebounce } from "./Hooks";

import { translate } from "./Services/Translate";
import { AUTO_LANGUAGE, VOICE_FOR_LANGUAGES } from "./Constants";
import { SectionType } from "./types.d";
import {
    TextArea,
    ArrowsIcon,
    LanguageSelector,
    ClipboardIcon,
    SpeakerIcon,
} from "./Components";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

export function App() {
    const {
        loading,
        fromLanguage,
        toLanguage,
        fromText,
        result,
        interchangeLanguages,
        setFromLanguage,
        setToLanguage,
        setFromText,
        setResult,
    } = useStore();

    const debouncedFromText = useDebounce(fromText);

    useEffect(() => {
        if (debouncedFromText === "") return;

        translate({ fromLanguage, toLanguage, text: debouncedFromText })
            .then((result) => {
                if (result == null) return;

                setResult(result);
            })
            .catch(() => setResult("Error"));
    }, [debouncedFromText, fromLanguage, toLanguage]);

    const handleClipboard = () => {
        navigator.clipboard.writeText(result);
    };

    const handleSpeaker = () => {
        const utterance = new SpeechSynthesisUtterance(result);
        utterance.lang = VOICE_FOR_LANGUAGES[toLanguage];
        speechSynthesis.speak(utterance);
    };

    return (
        <Container fluid>
            <h1 style={{ textAlign: "center", marginBottom: "32px" }}>Google Translate</h1>

            <Row>
                <Col>
                    <Stack gap={2}>
                        <LanguageSelector
                            type={SectionType.From}
                            value={fromLanguage}
                            onChange={setFromLanguage}
                        />

                        <TextArea
                            type={SectionType.From}
                            value={fromText}
                            onChange={setFromText}
                        />
                    </Stack>
                </Col>
                <Col xs="auto">
                    <Button
                        variant="link"
                        disabled={fromLanguage === AUTO_LANGUAGE}
                        onClick={() => interchangeLanguages()}
                        style={{ padding: 0, margin: "6px 12px" }}
                    >
                        <ArrowsIcon />
                    </Button>
                </Col>
                <Col>
                    <Stack gap={2}>
                        <LanguageSelector
                            type={SectionType.To}
                            value={toLanguage}
                            onChange={setToLanguage}
                        />

                        <div style={{ position: "relative" }}>
                            <TextArea
                                loading={loading}
                                type={SectionType.To}
                                value={result}
                                onChange={setResult}
                            />

                            <div
                                style={{
                                    position: "absolute",
                                    left: 0,
                                    bottom: 10,
                                    display: "flex",
                                }}
                            >
                                <Button
                                    variant="link"
                                    style={{ opacity: 0.5 }}
                                    onMouseOver={(e) =>
                                        (e.currentTarget.style.opacity = "1")
                                    }
                                    onMouseOut={(e) =>
                                        (e.currentTarget.style.opacity = "0.5")
                                    }
                                    onClick={handleClipboard}
                                >
                                    <ClipboardIcon />
                                </Button>

                                <Button
                                    variant="link"
                                    style={{ opacity: 0.5 }}
                                    onMouseOver={(e) =>
                                        (e.currentTarget.style.opacity = "1")
                                    }
                                    onMouseOut={(e) =>
                                        (e.currentTarget.style.opacity = "0.5")
                                    }
                                    onClick={handleSpeaker}
                                >
                                    <SpeakerIcon />
                                </Button>
                            </div>
                        </div>
                    </Stack>
                </Col>
            </Row>
        </Container>
    );
}
