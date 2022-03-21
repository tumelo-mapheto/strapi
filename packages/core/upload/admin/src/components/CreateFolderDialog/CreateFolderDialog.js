import * as yup from 'yup';
import { Formik } from 'formik';
import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { Button } from '@strapi/design-system/Button';
import { Grid, GridItem } from '@strapi/design-system/Grid';
import {
  ModalLayout,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '@strapi/design-system/ModalLayout';
import { TextInput } from '@strapi/design-system/TextInput';
import { Typography } from '@strapi/design-system/Typography';
import { VisuallyHidden } from '@strapi/design-system/VisuallyHidden';
import { Form } from '@strapi/helper-plugin';

import { getTrad } from '../../utils';

const folderSchema = yup.object({
  name: yup.string().required(),
  location: yup.string(),
});

export const CreateFolderDialog = ({ onClose, folder }) => {
  const submitButtonRef = useRef(null);
  const { formatMessage } = useIntl();

  const initialFormData = {
    name: folder?.name || undefined,
    location: folder?.location,
  };

  const handleSubmit = () => {
    onClose();
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <ModalLayout onClose={handleClose} labelledBy="title">
      <ModalHeader>
        <Typography fontWeight="bold" textColor="neutral800" as="h2" id="title">
          {formatMessage({
            id: getTrad('modal.folder.create.title'),
            defaultMessage: 'Add new folder',
          })}
        </Typography>
      </ModalHeader>

      <ModalBody>
        <Formik
          validationSchema={folderSchema}
          validateOnChange={false}
          onSubmit={handleSubmit}
          initialValues={initialFormData}
        >
          {({ values, errors, handleChange }) => (
            <Form noValidate>
              <Grid gap={4}>
                <GridItem xs={12} col={6}>
                  <TextInput
                    label={formatMessage({
                      id: getTrad('form.input.label.folder-name'),
                      defaultMessage: 'Folder name',
                    })}
                    name="name"
                    value={values.name}
                    error={errors.name}
                    onChange={handleChange}
                  />
                </GridItem>

                <GridItem xs={12} col={6}>
                  <TextInput
                    label={formatMessage({
                      id: getTrad('form.input.label.folder-location'),
                      defaultMessage: 'Folder location',
                    })}
                    name="location"
                    value={values.location}
                    error={errors.location}
                    onChange={handleChange}
                  />
                </GridItem>
              </Grid>

              <VisuallyHidden>
                <button type="submit" tabIndex={-1} ref={submitButtonRef} name="hidden-submit">
                  {formatMessage({ id: 'submit', defaultMessage: 'Submit' })}
                </button>
              </VisuallyHidden>
            </Form>
          )}
        </Formik>
      </ModalBody>

      <ModalFooter
        startActions={
          <Button onClick={() => handleClose()} variant="tertiary" name="cancel">
            {formatMessage({ id: 'cancel', defaultMessage: 'Cancel' })}
          </Button>
        }
        endActions={
          <Button onClick={() => submitButtonRef.current.click()} name="submit">
            {formatMessage({ id: 'modal.folder.create.submit', defaultMessage: 'Create' })}
          </Button>
        }
      />
    </ModalLayout>
  );
};

CreateFolderDialog.defaultProps = {
  folder: undefined,
};

CreateFolderDialog.propTypes = {
  folder: PropTypes.shape({
    name: PropTypes.string.isRequired,
    location: PropTypes.number.isRequired,
  }),
  onClose: PropTypes.func.isRequired,
};
