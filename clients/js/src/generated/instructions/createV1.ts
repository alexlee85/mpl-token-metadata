/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

import {
  AccountMeta,
  Amount,
  Context,
  Option,
  PublicKey,
  Serializer,
  Signer,
  WrappedInstruction,
  checkForIsWritableOverride as isWritable,
  isSigner,
  mapAmountSerializer,
  mapSerializer,
  none,
  publicKey,
} from '@metaplex-foundation/umi';
import { findMetadataPda } from '../accounts';
import {
  Collection,
  CollectionArgs,
  CollectionDetails,
  CollectionDetailsArgs,
  Creator,
  CreatorArgs,
  PrintSupply,
  PrintSupplyArgs,
  TokenStandard,
  TokenStandardArgs,
  Uses,
  UsesArgs,
  getCollectionDetailsSerializer,
  getCollectionSerializer,
  getCreatorSerializer,
  getPrintSupplySerializer,
  getTokenStandardSerializer,
  getUsesSerializer,
} from '../types';

// Accounts.
export type CreateV1InstructionAccounts = {
  /** Unallocated metadata account with address as pda of ['metadata', program id, mint id] */
  metadata?: PublicKey;
  /** Unallocated edition account with address as pda of ['metadata', program id, mint, 'edition'] */
  masterEdition?: PublicKey;
  /** Mint of token asset */
  mint: PublicKey | Signer;
  /** Mint authority */
  authority?: Signer;
  /** Payer */
  payer?: Signer;
  /** Update authority for the metadata account */
  updateAuthority?: PublicKey | Signer;
  /** System program */
  systemProgram?: PublicKey;
  /** Instructions sysvar account */
  sysvarInstructions?: PublicKey;
  /** SPL Token program */
  splTokenProgram?: PublicKey;
};

// Arguments.
export type CreateV1InstructionData = {
  discriminator: number;
  createV1Discriminator: number;
  name: string;
  symbol: string;
  uri: string;
  sellerFeeBasisPoints: Amount<'%', 2>;
  creators: Option<Array<Creator>>;
  primarySaleHappened: boolean;
  isMutable: boolean;
  tokenStandard: TokenStandard;
  collection: Option<Collection>;
  uses: Option<Uses>;
  collectionDetails: Option<CollectionDetails>;
  ruleSet: Option<PublicKey>;
  decimals: Option<number>;
  printSupply: Option<PrintSupply>;
};

export type CreateV1InstructionDataArgs = {
  name: string;
  symbol?: string;
  uri: string;
  sellerFeeBasisPoints: Amount<'%', 2>;
  creators: Option<Array<CreatorArgs>>;
  primarySaleHappened?: boolean;
  isMutable?: boolean;
  tokenStandard: TokenStandardArgs;
  collection?: Option<CollectionArgs>;
  uses?: Option<UsesArgs>;
  collectionDetails?: Option<CollectionDetailsArgs>;
  ruleSet?: Option<PublicKey>;
  decimals?: Option<number>;
  printSupply?: Option<PrintSupplyArgs>;
};

export function getCreateV1InstructionDataSerializer(
  context: Pick<Context, 'serializer'>
): Serializer<CreateV1InstructionDataArgs, CreateV1InstructionData> {
  const s = context.serializer;
  return mapSerializer<
    CreateV1InstructionDataArgs,
    CreateV1InstructionData,
    CreateV1InstructionData
  >(
    s.struct<CreateV1InstructionData>(
      [
        ['discriminator', s.u8()],
        ['createV1Discriminator', s.u8()],
        ['name', s.string()],
        ['symbol', s.string()],
        ['uri', s.string()],
        ['sellerFeeBasisPoints', mapAmountSerializer(s.u16(), '%', 2)],
        ['creators', s.option(s.array(getCreatorSerializer(context)))],
        ['primarySaleHappened', s.bool()],
        ['isMutable', s.bool()],
        ['tokenStandard', getTokenStandardSerializer(context)],
        ['collection', s.option(getCollectionSerializer(context))],
        ['uses', s.option(getUsesSerializer(context))],
        [
          'collectionDetails',
          s.option(getCollectionDetailsSerializer(context)),
        ],
        ['ruleSet', s.option(s.publicKey())],
        ['decimals', s.option(s.u8())],
        ['printSupply', s.option(getPrintSupplySerializer(context))],
      ],
      { description: 'CreateV1InstructionData' }
    ),
    (value) =>
      ({
        ...value,
        discriminator: 42,
        createV1Discriminator: 0,
        symbol: value.symbol ?? '',
        primarySaleHappened: value.primarySaleHappened ?? false,
        isMutable: value.isMutable ?? true,
        collection: value.collection ?? none(),
        uses: value.uses ?? none(),
        collectionDetails: value.collectionDetails ?? none(),
        ruleSet: value.ruleSet ?? none(),
        decimals: value.decimals ?? none(),
        printSupply: value.printSupply ?? none(),
      } as CreateV1InstructionData)
  ) as Serializer<CreateV1InstructionDataArgs, CreateV1InstructionData>;
}

// Instruction.
export function createV1(
  context: Pick<
    Context,
    'serializer' | 'programs' | 'eddsa' | 'identity' | 'payer'
  >,
  input: CreateV1InstructionAccounts & CreateV1InstructionDataArgs
): WrappedInstruction {
  const signers: Signer[] = [];
  const keys: AccountMeta[] = [];

  // Program ID.
  const programId = context.programs.getPublicKey(
    'mplTokenMetadata',
    'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s'
  );

  // Resolved accounts.
  const mintAccount = input.mint;
  const metadataAccount =
    input.metadata ??
    findMetadataPda(context, { mint: publicKey(mintAccount) });
  const masterEditionAccount = input.masterEdition ?? {
    ...programId,
    isWritable: false,
  };
  const authorityAccount = input.authority ?? context.identity;
  const payerAccount = input.payer ?? context.payer;
  const updateAuthorityAccount = input.updateAuthority ?? context.identity;
  const systemProgramAccount = input.systemProgram ?? {
    ...context.programs.getPublicKey(
      'splSystem',
      '11111111111111111111111111111111'
    ),
    isWritable: false,
  };
  const sysvarInstructionsAccount =
    input.sysvarInstructions ??
    publicKey('Sysvar1nstructions1111111111111111111111111');
  const splTokenProgramAccount = input.splTokenProgram ?? {
    ...context.programs.getPublicKey(
      'splToken',
      'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'
    ),
    isWritable: false,
  };

  // Metadata.
  keys.push({
    pubkey: metadataAccount,
    isSigner: false,
    isWritable: isWritable(metadataAccount, true),
  });

  // Master Edition.
  keys.push({
    pubkey: masterEditionAccount,
    isSigner: false,
    isWritable: isWritable(masterEditionAccount, true),
  });

  // Mint.
  if (isSigner(mintAccount)) {
    signers.push(mintAccount);
  }
  keys.push({
    pubkey: publicKey(mintAccount),
    isSigner: isSigner(mintAccount),
    isWritable: isWritable(mintAccount, true),
  });

  // Authority.
  signers.push(authorityAccount);
  keys.push({
    pubkey: authorityAccount.publicKey,
    isSigner: true,
    isWritable: isWritable(authorityAccount, false),
  });

  // Payer.
  signers.push(payerAccount);
  keys.push({
    pubkey: payerAccount.publicKey,
    isSigner: true,
    isWritable: isWritable(payerAccount, true),
  });

  // Update Authority.
  if (isSigner(updateAuthorityAccount)) {
    signers.push(updateAuthorityAccount);
  }
  keys.push({
    pubkey: publicKey(updateAuthorityAccount),
    isSigner: isSigner(updateAuthorityAccount),
    isWritable: isWritable(updateAuthorityAccount, false),
  });

  // System Program.
  keys.push({
    pubkey: systemProgramAccount,
    isSigner: false,
    isWritable: isWritable(systemProgramAccount, false),
  });

  // Sysvar Instructions.
  keys.push({
    pubkey: sysvarInstructionsAccount,
    isSigner: false,
    isWritable: isWritable(sysvarInstructionsAccount, false),
  });

  // Spl Token Program.
  keys.push({
    pubkey: splTokenProgramAccount,
    isSigner: false,
    isWritable: isWritable(splTokenProgramAccount, false),
  });

  // Data.
  const data = getCreateV1InstructionDataSerializer(context).serialize(input);

  // Bytes Created On Chain.
  const bytesCreatedOnChain = 1427;

  return {
    instruction: { keys, programId, data },
    signers,
    bytesCreatedOnChain,
  };
}
