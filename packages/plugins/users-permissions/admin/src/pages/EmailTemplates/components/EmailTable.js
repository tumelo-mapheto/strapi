import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { Table, Thead, Tbody, Tr, Td, Th } from '@strapi/design-system/Table';
import { VisuallyHidden } from '@strapi/design-system/VisuallyHidden';
import { Typography } from '@strapi/design-system/Typography';
import { IconButton } from '@strapi/design-system/IconButton';
import Pencil from '@strapi/icons/Pencil';
import Reload from '@strapi/icons/Refresh';
import { onRowClick, stopPropagation } from '@strapi/helper-plugin';
import Check from '@strapi/icons/Check';
import { getTrad } from '../../../utils';

const EmailTable = ({ canUpdate, onEditClick }) => {
  const { formatMessage } = useIntl();

  return (
    <Table colCount={3} rowCount={3}>
      <Thead>
        <Tr>
          <Th width="1%">
            <VisuallyHidden>
              {formatMessage({
                id: getTrad('Email.template.table.icon.label'),
                defaultMessage: 'icon',
              })}
            </VisuallyHidden>
          </Th>
          <Th>
            <Typography variant="sigma" textColor="neutral600">
              {formatMessage({
                id: getTrad('Email.template.table.name.label'),
                defaultMessage: 'name',
              })}
            </Typography>
          </Th>
          <Th width="1%">
            <VisuallyHidden>
              {formatMessage({
                id: getTrad('Email.template.table.action.label'),
                defaultMessage: 'action',
              })}
            </VisuallyHidden>
          </Th>
        </Tr>
      </Thead>
      <Tbody>
        <Tr {...onRowClick({ fn: () => onEditClick('reset_password') })}>
          <Td>
            <Reload
              aria-label={formatMessage({
                id: 'global.reset-password',
                defaultMessage: 'Reset password',
              })}
            />
          </Td>
          <Td>
            <Typography>
              {formatMessage({
                id: 'global.reset-password',
                defaultMessage: 'Reset password',
              })}
            </Typography>
          </Td>
          <Td {...stopPropagation}>
            <IconButton
              onClick={() => onEditClick('reset_password')}
              label={formatMessage({
                id: getTrad('Email.template.form.edit.label'),
                defaultMessage: 'Edit a template',
              })}
              noBorder
              icon={canUpdate && <Pencil />}
            />
          </Td>
        </Tr>
        <Tr {...onRowClick({ fn: () => onEditClick('email_confirmation') })}>
          <Td>
            <Check
              aria-label={formatMessage({
                id: getTrad('Email.template.email_confirmation'),
                defaultMessage: 'Email address confirmation',
              })}
            />
          </Td>
          <Td>
            <Typography>
              {formatMessage({
                id: getTrad('Email.template.email_confirmation'),
                defaultMessage: 'Email address confirmation',
              })}
            </Typography>
          </Td>
          <Td {...stopPropagation}>
            <IconButton
              onClick={() => onEditClick('email_confirmation')}
              label={formatMessage({
                id: getTrad('Email.template.form.edit.label'),
                defaultMessage: 'Edit a template',
              })}
              noBorder
              icon={canUpdate && <Pencil />}
            />
          </Td>
        </Tr>
      </Tbody>
    </Table>
  );
};

EmailTable.propTypes = {
  canUpdate: PropTypes.bool.isRequired,
  onEditClick: PropTypes.func.isRequired,
};

export default EmailTable;
