import React, { useState, useMemo, useEffect } from "react";
import PropTypes from "prop-types";
import { isEmpty, isObject } from "lodash";
import { Button } from "@strapi/design-system/Button";
import {
  Field,
  FieldLabel,
  FieldHint,
  FieldError,
} from "@strapi/design-system/Field";
import { Stack } from "@strapi/design-system/Stack";
import { FormattedMessage } from "react-intl";
import ImportModal from "../ImportModal";
import pluginId from "../../pluginId";

const OEmbedField = ({
  description,
  error,
  name,
  onChange,
  value,
  required,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // Parse the value from string to JSON
  const parseValue = (value) => {
    let parsedValue = null;

    try {
      parsedValue = JSON.parse(value);
    } catch {}

    return parsedValue;
  };

  const [draftValue, setDraftValue] = useState(parseValue(value));

  useEffect(() => {
    setDraftValue(parseValue(value));
  }, [value]);

  const hasValue = useMemo(
    () => (isObject(draftValue) && draftValue.url ? true : false),
    [draftValue]
  );

  const openModal = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  const onImport = (data) => {
    onChange({
      target: {
        name: name,
        value: isObject(data) ? JSON.stringify(data) : null,
      },
    });
  };

  return (
    <Field name="oembed" error={error} hint={description}>
      <Stack size={1}>
        <FieldLabel>{name}</FieldLabel>
        <div
          style={{
            border: "1px solid #e3e9f3",
            padding: "15px",
            borderRadius: "2px",
          }}
        >
          {hasValue && (
            <p>
              {draftValue.title && (
                <>
                  <span style={{ fontSize: "1.9rem" }}>{draftValue.title}</span>
                  <br />
                </>
              )}
              <a href={draftValue.url} target="_blank">
                {draftValue.url}
              </a>
            </p>
          )}
          <div>
            <Button variant="default" onClick={openModal}>
              {hasValue && (
                <FormattedMessage id={`${pluginId}.form.button.edit`} />
              )}
              {!hasValue && (
                <FormattedMessage id={`${pluginId}.form.button.import`} />
              )}
            </Button>
            {hasValue && (
              <Button
                variant="danger"
                onClick={() => onImport(null)}
                style={{ marginLeft: "15px" }}
              >
                <FormattedMessage id={`${pluginId}.form.button.delete`} />
              </Button>
            )}
          </div>
        </div>
        <FieldHint
          style={!isEmpty(description) ? { marginTop: "1.4rem" } : {}}
        />
        <FieldError />
        {isOpen && (
          <ImportModal
            onClose={onClose}
            value={draftValue}
            onImport={onImport}
          />
        )}
      </Stack>
    </Field>
  );
};

OEmbedField.defaultProps = {
  description: undefined,
  error: undefined,
  value: "",
};

OEmbedField.propTypes = {
  errors: PropTypes.array,
  inputDescription: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.shape({
      id: PropTypes.string,
      params: PropTypes.object,
    }),
  ]),
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.shape({
      id: PropTypes.string,
      params: PropTypes.object,
    }),
  ]),
  name: PropTypes.string.isRequired,
  noErrorsDescription: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
};

export default OEmbedField;
