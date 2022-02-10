import React, { useEffect, useRef, useState } from "react";
import { useIntl } from "react-intl";
import PropTypes from "prop-types";
import { isObject } from "lodash";
import {
  ModalLayout,
  ModalBody,
  ModalHeader,
  ModalFooter,
} from "@strapi/design-system/ModalLayout";
import { Typography } from "@strapi/design-system/Typography";
import { Button } from "@strapi/design-system/Button";
import { TextInput } from "@strapi/design-system/TextInput";
import { FormattedMessage } from "react-intl";
import { axiosInstance, getTrad, getRequestUrl } from "../../utils";
import pluginId from "../../pluginId";

const ImportModal = ({ onClose, onImport, value }) => {
  const { formatMessage } = useIntl();
  const [isLoading, setIsLoading] = useState(false);
  const [inputError, setInputError] = useState("");
  const [url, setUrl] = useState("");
  const abortController = new AbortController();

  const onSubmit = async () => {
    setIsLoading(true);
    const { signal } = abortController;

    try {
      setInputError("");
      const { data } = await axiosInstance.get(
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
        onClose();
      }
    } catch (error) {
      setInputError(error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setUrl(isObject(value) && value.url ? value.url : "");

    // Focus on the input
    setTimeout(() => {
      const input = document.getElementById("oembed-form-url");
      if (input) {
        input.focus();
      }
    }, 150);

    return () => {
      // Abort the endpoint call if we close the modal
      abortController.abort();
    };
  }, []);

  // Submit when we hit enter on the input
  const keyPress = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      onSubmit();
    }
  };

  return (
    <ModalLayout
      onClose={onClose}
      style={{ width: "35rem" }}
      labelledBy="title"
    >
      <ModalHeader>
        <section>
          <Typography
            fontWeight="bold"
            textColor="neutral800"
            as="h2"
            id="title"
          >
            <FormattedMessage id={`${pluginId}.modal.import.title`} />
          </Typography>
        </section>
      </ModalHeader>
      <form>
        <ModalBody>
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
        </ModalBody>
        <ModalFooter
          startActions={
            <Button onClick={onClose} variant="tertiary">
              <FormattedMessage id="app.components.Button.cancel" />
            </Button>
          }
          endActions={
            <>
              <Button variant="default" loading={isLoading} onClick={onSubmit}>
                <FormattedMessage
                  id={`${pluginId}.modal.import.button.import`}
                />
              </Button>
            </>
          }
        />
      </form>
    </ModalLayout>
  );
};

ImportModal.defaultProps = {
  value: {},
};

ImportModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onImport: PropTypes.func.isRequired,
  value: PropTypes.object,
};

export default ImportModal;
