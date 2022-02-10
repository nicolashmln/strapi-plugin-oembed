import React, { useState, useMemo, useEffect } from "react";
import PropTypes from "prop-types";
import { isEmpty, isObject } from "lodash";
import { Button } from "@buffetjs/core";
import { Label, InputDescription, InputErrors } from "@strapi/helper-plugin";
import { FormattedMessage } from "react-intl";
import ImportModal from "../ImportModal";
import pluginId from "../../pluginId";

const OEmbedField = ({
  inputDescription,
  errors,
  label,
  name,
  noErrorsDescription,
  onChange,
  value,
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

  let spacer = !isEmpty(inputDescription) ? (
    <div style={{ height: ".4rem" }} />
  ) : (
    <div />
  );

  if (!noErrorsDescription && !isEmpty(errors)) {
    spacer = <div />;
  }

  const openModal = () => {
    setIsOpen(true);
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
    <div>
      <div>Test</div>
      {/* <Label htmlFor={name} message={label} style={{ marginBottom: 10 }} />
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
          <Button color="primary" onClick={openModal}>
            {hasValue && (
              <FormattedMessage id={`${pluginId}.form.button.edit`} />
            )}
            {!hasValue && (
              <FormattedMessage id={`${pluginId}.form.button.import`} />
            )}
          </Button>
          {hasValue && (
            <Button
              color="delete"
              onClick={() => onImport(null)}
              style={{ marginLeft: "15px" }}
            >
              <FormattedMessage id={`${pluginId}.form.button.delete`} />
            </Button>
          )}
        </div>
      </div>
      <InputDescription
        message={inputDescription}
        style={!isEmpty(inputDescription) ? { marginTop: "1.4rem" } : {}}
      />
      <InputErrors
        errors={(!noErrorsDescription && errors) || []}
        name={name}
      />
      {spacer}
      <ImportModal
        isOpen={isOpen}
        value={draftValue}
        onToggle={() => setIsOpen(!isOpen)}
        onImport={onImport}
      /> */}
    </div>
  );
};

OEmbedField.defaultProps = {
  errors: [],
  inputDescription: null,
  label: "",
  noErrorsDescription: false,
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
