//! This code was AUTOGENERATED using the kinobi library.
//! Please DO NOT EDIT THIS FILE, instead use visitors
//! to add features, then rerun kinobi to update it.
//!
//! [https://github.com/metaplex-foundation/kinobi]
//!

use crate::generated::types::Key;
use borsh::BorshDeserialize;
use borsh::BorshSerialize;
use solana_program::pubkey::Pubkey;

#[derive(BorshSerialize, BorshDeserialize, Clone, Debug, Eq, PartialEq)]
#[cfg_attr(feature = "serde", derive(serde::Serialize, serde::Deserialize))]
pub struct EditionMarker {
    pub key: Key,
    pub ledger: [u8; 31],
}

impl EditionMarker {
    pub const LEN: usize = 32;

    /// Prefix values used to generate a PDA for this account.
    ///
    /// Values are positional and appear in the following order:
    ///
    ///   0. `EditionMarker::PREFIX.0`
    ///   1. `crate::MPL_TOKEN_METADATA_ID`
    ///   2. mint (`Pubkey`)
    ///   3. `EditionMarker::PREFIX.1`
    ///   4. edition_marker (`&str`)
    pub const PREFIX: (&'static [u8], &'static [u8]) =
        ("metadata".as_bytes(), "edition".as_bytes());

    pub fn create_pda(
        mint: Pubkey,
        edition_marker: &str,
        bump: u8,
    ) -> Result<solana_program::pubkey::Pubkey, solana_program::pubkey::PubkeyError> {
        solana_program::pubkey::Pubkey::create_program_address(
            &[
                "metadata".as_bytes(),
                crate::MPL_TOKEN_METADATA_ID.as_ref(),
                mint.as_ref(),
                "edition".as_bytes(),
                edition_marker.to_string().as_ref(),
                &[bump],
            ],
            &crate::MPL_TOKEN_METADATA_ID,
        )
    }

    pub fn find_pda(mint: &Pubkey, edition_marker: &str) -> (solana_program::pubkey::Pubkey, u8) {
        solana_program::pubkey::Pubkey::find_program_address(
            &[
                "metadata".as_bytes(),
                crate::MPL_TOKEN_METADATA_ID.as_ref(),
                mint.as_ref(),
                "edition".as_bytes(),
                edition_marker.to_string().as_ref(),
            ],
            &crate::MPL_TOKEN_METADATA_ID,
        )
    }

    #[inline(always)]
    pub fn from_bytes(data: &[u8]) -> Result<Self, std::io::Error> {
        let mut data = data;
        Self::deserialize(&mut data)
    }
}

impl<'a> TryFrom<&solana_program::account_info::AccountInfo<'a>> for EditionMarker {
    type Error = std::io::Error;

    fn try_from(
        account_info: &solana_program::account_info::AccountInfo<'a>,
    ) -> Result<Self, Self::Error> {
        let mut data: &[u8] = &(*account_info.data).borrow();
        Self::deserialize(&mut data)
    }
}
