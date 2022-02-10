import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { isObject } from "lodash";
import { useGlobalContext, request } from "@strapi/helper-plugin";
import {
  ModalLayout,
  ModalBody,
  ModalHeader,
  ModalFooter,
} from "@strapi/design-system/ModalLayout";
import { FormattedMessage } from "react-intl";
import { Button } from "@strapi/design-system/Button";
import { TextInput } from "@strapi/design-system/TextInput";
import { Box } from "@strapi/design-system/Box";
import { getTrad, getRequestUrl } from "../../utils";
import pluginId from "../../pluginId";

const ImportModal = ({ isOpen, onToggle, onImport, value }) => {
  const { formatMessage } = useGlobalContext();
  const [isLoading, setIsLoading] = useState(false);
  const [inputError, setInputError] = useState("");
  const [url, setUrl] = useState("");
  const abortController = new AbortController();

  const onSubmit = async () => {
    setIsLoading(true);
    const { signal } = abortController;

    try {
      setInputError("");
      const data = await request(
        getRequestUrl(`fetch?url=${encodeURIComponent(url)}`, {
          method: "GET",
          signal,
        })
      );
      setIsLoading(false);

      if (data.error) {
        setInputError(data.error);
      } else {
        onImport(data);
        onToggle();
      }
    } catch (error) {
      setInputError(error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      setUrl(isObject(value) && value.url ? value.url : "");

      // Focus on the input
      setTimeout(() => {
        const input = document.getElementById("oembed-form-url");
        if (input) {
          input.focus();
        }
      }, 150);
    }

    return () => {
      // Abort the endpoint call if we close the modal
      abortController.abort();
    };
  }, [isOpen]);

  // Submit when we hit enter on the input
  const keyPress = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      onSubmit();
    }
  };

  return (
    <ModalLayout isOpen={isOpen} onToggle={onToggle} style={{ width: "50rem" }}>
      <ModalHeader>
        <section>
          <Typography fontWeight="bold" textColor="neutral800" as="h2">
            <FormattedMessage id={`${pluginId}.modal.import.title`} />
          </Typography>
        </section>
      </ModalHeader>
      <form>
        <ModalBody>
          <Box padding={15}>
            <TextInput
              id="oembed-form-url"
              label={formatMessage({
                id: getTrad("modal.import.input.label"),
              })}
              hint={formatMessage({
                id: getTrad("modal.import.input.description"),
              })}
              validations={{
                required: true,
              }}
              onChange={({ target: { value } }) => {
                setUrl(value);
              }}
              onKeyDown={keyPress}
              error={inputError}
              name="name"
              type="text"
              value={url}
            />
          </Box>
        </ModalBody>
        <ModalFooter>
          <section>
            <Button onClick={onToggle} variant="tertiary">
              <FormattedMessage id="app.components.Button.cancel" />
            </Button>
            <Button variant="default" isLoading={isLoading} onClick={onSubmit}>
              <FormattedMessage id={`${pluginId}.modal.import.button.import`} />
            </Button>
          </section>
        </ModalFooter>
      </form>
    </ModalLayout>
  );
};

ImportModal.defaultProps = {
  value: {},
};

ImportModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  onImport: PropTypes.func.isRequired,
  value: PropTypes.object,
};

export default ImportModal;
