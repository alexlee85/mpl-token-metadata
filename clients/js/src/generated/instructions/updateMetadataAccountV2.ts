/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

import {
  AccountMeta,
  Context,
  Option,
  PublicKey,
  Serializer,
  Signer,
  WrappedInstruction,
  checkForIsWritableOverride as isWritable,
  mapSerializer,
} from '@lorisleiva/js-core';
import { DataV2, DataV2Args, getDataV2Serializer } from '../types';

// Accounts.
export type UpdateMetadataAccountV2InstructionAccounts = {
  /** Metadata account */
  metadata: PublicKey;
  /** Update authority key */
  updateAuthority?: Signer;
};

// Arguments.
export type UpdateMetadataAccountV2InstructionData = {
  discriminator: number;
  data: Option<DataV2>;
  newUpdateAuthority: Option<PublicKey>;
  primarySaleHappened: Option<boolean>;
  isMutable: Option<boolean>;
};

export type UpdateMetadataAccountV2InstructionArgs = {
  data: Option<DataV2Args>;
  newUpdateAuthority: Option<PublicKey>;
  primarySaleHappened: Option<boolean>;
  isMutable: Option<boolean>;
};

export function getUpdateMetadataAccountV2InstructionDataSerializer(
  context: Pick<Context, 'serializer'>
): Serializer<
  UpdateMetadataAccountV2InstructionArgs,
  UpdateMetadataAccountV2InstructionData
> {
  const s = context.serializer;
  return mapSerializer<
    UpdateMetadataAccountV2InstructionArgs,
    UpdateMetadataAccountV2InstructionData,
    UpdateMetadataAccountV2InstructionData
  >(
    s.struct<UpdateMetadataAccountV2InstructionData>(
      [
        ['discriminator', s.u8],
        ['data', s.option(getDataV2Serializer(context))],
        ['newUpdateAuthority', s.option(s.publicKey)],
        ['primarySaleHappened', s.option(s.bool())],
        ['isMutable', s.option(s.bool())],
      ],
      'UpdateMetadataAccountV2InstructionArgs'
    ),
    (value) =>
      ({
        discriminator: 15,
        ...value,
      } as UpdateMetadataAccountV2InstructionData)
  ) as Serializer<
    UpdateMetadataAccountV2InstructionArgs,
    UpdateMetadataAccountV2InstructionData
  >;
}

// Instruction.
export function updateMetadataAccountV2(
  context: Pick<Context, 'serializer' | 'programs' | 'identity'>,
  input: UpdateMetadataAccountV2InstructionAccounts &
    UpdateMetadataAccountV2InstructionArgs
): WrappedInstruction {
  const signers: Signer[] = [];
  const keys: AccountMeta[] = [];

  // Program ID.
  const programId: PublicKey =
    context.programs.get('mplTokenMetadata').publicKey;

  // Resolved accounts.
  const metadataAccount = input.metadata;
  const updateAuthorityAccount = input.updateAuthority ?? context.identity;

  // Metadata.
  keys.push({
    pubkey: metadataAccount,
    isSigner: false,
    isWritable: isWritable(metadataAccount, true),
  });

  // Update Authority.
  signers.push(updateAuthorityAccount);
  keys.push({
    pubkey: updateAuthorityAccount.publicKey,
    isSigner: true,
    isWritable: isWritable(updateAuthorityAccount, false),
  });

  // Data.
  const data =
    getUpdateMetadataAccountV2InstructionDataSerializer(context).serialize(
      input
    );

  // Bytes Created On Chain.
  const bytesCreatedOnChain = 0;

  return {
    instruction: { keys, programId, data },
    signers,
    bytesCreatedOnChain,
  };
}