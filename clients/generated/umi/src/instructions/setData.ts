/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/kinobi-so/kinobi
 */

import {
  Context,
  Pda,
  PublicKey,
  Signer,
  TransactionBuilder,
  transactionBuilder,
} from '@metaplex-foundation/umi';
import {
  Serializer,
  bytes,
  mapSerializer,
  struct,
  u32,
} from '@metaplex-foundation/umi/serializers';
import {
  ResolvedAccount,
  ResolvedAccountsWithIndices,
  getAccountMetasAndSigners,
} from '../shared';

// Accounts.
export type SetDataInstructionAccounts = {
  authority: Signer;
  pda: PublicKey | Pda;
};

// Data.
export type SetDataInstructionData = {
  discriminator: Uint8Array;
  data: number;
};

export type SetDataInstructionDataArgs = { data: number };

export function getSetDataInstructionDataSerializer(): Serializer<
  SetDataInstructionDataArgs,
  SetDataInstructionData
> {
  return mapSerializer<SetDataInstructionDataArgs, any, SetDataInstructionData>(
    struct<SetDataInstructionData>(
      [
        ['discriminator', bytes({ size: 8 })],
        ['data', u32()],
      ],
      { description: 'SetDataInstructionData' }
    ),
    (value) => ({
      ...value,
      discriminator: new Uint8Array([223, 114, 91, 136, 197, 78, 153, 153]),
    })
  ) as Serializer<SetDataInstructionDataArgs, SetDataInstructionData>;
}

// Args.
export type SetDataInstructionArgs = SetDataInstructionDataArgs;

// Instruction.
export function setData(
  context: Pick<Context, 'programs'>,
  input: SetDataInstructionAccounts & SetDataInstructionArgs
): TransactionBuilder {
  // Program ID.
  const programId = context.programs.getPublicKey(
    'kinobiTest',
    '3eSEGBd6d6C6imYBaeu9vDJqf4cCjxPE1JkX5TaagJCD'
  );

  // Accounts.
  const resolvedAccounts = {
    authority: {
      index: 0,
      isWritable: true as boolean,
      value: input.authority ?? null,
    },
    pda: { index: 1, isWritable: true as boolean, value: input.pda ?? null },
  } satisfies ResolvedAccountsWithIndices;

  // Arguments.
  const resolvedArgs: SetDataInstructionArgs = { ...input };

  // Accounts in order.
  const orderedAccounts: ResolvedAccount[] = Object.values(
    resolvedAccounts
  ).sort((a, b) => a.index - b.index);

  // Keys and Signers.
  const [keys, signers] = getAccountMetasAndSigners(
    orderedAccounts,
    'programId',
    programId
  );

  // Data.
  const data = getSetDataInstructionDataSerializer().serialize(
    resolvedArgs as SetDataInstructionDataArgs
  );

  // Bytes Created On Chain.
  const bytesCreatedOnChain = 0;

  return transactionBuilder([
    { instruction: { keys, programId, data }, signers, bytesCreatedOnChain },
  ]);
}
