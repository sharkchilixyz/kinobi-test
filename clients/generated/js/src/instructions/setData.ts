/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/kinobi-so/kinobi
 */

import {
  combineCodec,
  fixDecoderSize,
  fixEncoderSize,
  getBytesDecoder,
  getBytesEncoder,
  getStructDecoder,
  getStructEncoder,
  getU32Decoder,
  getU32Encoder,
  transformEncoder,
  type Address,
  type Codec,
  type Decoder,
  type Encoder,
  type IAccountMeta,
  type IAccountSignerMeta,
  type IInstruction,
  type IInstructionWithAccounts,
  type IInstructionWithData,
  type ReadonlyUint8Array,
  type TransactionSigner,
  type WritableAccount,
  type WritableSignerAccount,
} from '@solana/web3.js';
import { KINOBI_TEST_PROGRAM_ADDRESS } from '../programs';
import { getAccountMetaFactory, type ResolvedAccount } from '../shared';

export type SetDataInstruction<
  TProgram extends string = typeof KINOBI_TEST_PROGRAM_ADDRESS,
  TAccountAuthority extends string | IAccountMeta<string> = string,
  TAccountPda extends string | IAccountMeta<string> = string,
  TRemainingAccounts extends readonly IAccountMeta<string>[] = [],
> = IInstruction<TProgram> &
  IInstructionWithData<Uint8Array> &
  IInstructionWithAccounts<
    [
      TAccountAuthority extends string
        ? WritableSignerAccount<TAccountAuthority> &
            IAccountSignerMeta<TAccountAuthority>
        : TAccountAuthority,
      TAccountPda extends string ? WritableAccount<TAccountPda> : TAccountPda,
      ...TRemainingAccounts,
    ]
  >;

export type SetDataInstructionData = {
  discriminator: ReadonlyUint8Array;
  data: number;
};

export type SetDataInstructionDataArgs = { data: number };

export function getSetDataInstructionDataEncoder(): Encoder<SetDataInstructionDataArgs> {
  return transformEncoder(
    getStructEncoder([
      ['discriminator', fixEncoderSize(getBytesEncoder(), 8)],
      ['data', getU32Encoder()],
    ]),
    (value) => ({
      ...value,
      discriminator: new Uint8Array([223, 114, 91, 136, 197, 78, 153, 153]),
    })
  );
}

export function getSetDataInstructionDataDecoder(): Decoder<SetDataInstructionData> {
  return getStructDecoder([
    ['discriminator', fixDecoderSize(getBytesDecoder(), 8)],
    ['data', getU32Decoder()],
  ]);
}

export function getSetDataInstructionDataCodec(): Codec<
  SetDataInstructionDataArgs,
  SetDataInstructionData
> {
  return combineCodec(
    getSetDataInstructionDataEncoder(),
    getSetDataInstructionDataDecoder()
  );
}

export type SetDataInput<
  TAccountAuthority extends string = string,
  TAccountPda extends string = string,
> = {
  authority: TransactionSigner<TAccountAuthority>;
  pda: Address<TAccountPda>;
  data: SetDataInstructionDataArgs['data'];
};

export function getSetDataInstruction<
  TAccountAuthority extends string,
  TAccountPda extends string,
>(
  input: SetDataInput<TAccountAuthority, TAccountPda>
): SetDataInstruction<
  typeof KINOBI_TEST_PROGRAM_ADDRESS,
  TAccountAuthority,
  TAccountPda
> {
  // Program address.
  const programAddress = KINOBI_TEST_PROGRAM_ADDRESS;

  // Original accounts.
  const originalAccounts = {
    authority: { value: input.authority ?? null, isWritable: true },
    pda: { value: input.pda ?? null, isWritable: true },
  };
  const accounts = originalAccounts as Record<
    keyof typeof originalAccounts,
    ResolvedAccount
  >;

  // Original args.
  const args = { ...input };

  const getAccountMeta = getAccountMetaFactory(programAddress, 'programId');
  const instruction = {
    accounts: [
      getAccountMeta(accounts.authority),
      getAccountMeta(accounts.pda),
    ],
    programAddress,
    data: getSetDataInstructionDataEncoder().encode(
      args as SetDataInstructionDataArgs
    ),
  } as SetDataInstruction<
    typeof KINOBI_TEST_PROGRAM_ADDRESS,
    TAccountAuthority,
    TAccountPda
  >;

  return instruction;
}

export type ParsedSetDataInstruction<
  TProgram extends string = typeof KINOBI_TEST_PROGRAM_ADDRESS,
  TAccountMetas extends readonly IAccountMeta[] = readonly IAccountMeta[],
> = {
  programAddress: Address<TProgram>;
  accounts: {
    authority: TAccountMetas[0];
    pda: TAccountMetas[1];
  };
  data: SetDataInstructionData;
};

export function parseSetDataInstruction<
  TProgram extends string,
  TAccountMetas extends readonly IAccountMeta[],
>(
  instruction: IInstruction<TProgram> &
    IInstructionWithAccounts<TAccountMetas> &
    IInstructionWithData<Uint8Array>
): ParsedSetDataInstruction<TProgram, TAccountMetas> {
  if (instruction.accounts.length < 2) {
    // TODO: Coded error.
    throw new Error('Not enough accounts');
  }
  let accountIndex = 0;
  const getNextAccount = () => {
    const accountMeta = instruction.accounts![accountIndex]!;
    accountIndex += 1;
    return accountMeta;
  };
  return {
    programAddress: instruction.programAddress,
    accounts: {
      authority: getNextAccount(),
      pda: getNextAccount(),
    },
    data: getSetDataInstructionDataDecoder().decode(instruction.data),
  };
}
