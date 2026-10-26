import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  MenuItem,
  Divider,
  Alert,
  CircularProgress,
  FormControlLabel,
  Switch,
  Stack,
} from "@mui/material";

import { ArrowBack, Save } from "@mui/icons-material";

import { createMember, getMemberOptions } from "../../services/memberService";

const initialForm = {
  first_name: "",
  last_name: "",
  phone: "",
  email: "",
  status_id: "",
  group_id: "",
  entry_date: "",
  subscription: {
    amount: "",
    frequency: "MONTHLY",
    start_date: "",
  },
};

function MemberCreate() {
  const navigate = useNavigate();

  const [form, setForm] = useState(initialForm);
  const [options, setOptions] = useState({
    statuses: [],
    groups: [],
  });

  const [hasSubscription, setHasSubscription] = useState(false);
  const [loadingOptions, setLoadingOptions] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadOptions() {
      try {
        const data = await getMemberOptions();

        if (cancelled) return;

        setOptions(data);

        const activeStatus = data.statuses.find(
          (status) => status.code === "ACTIVE",
        );

        if (activeStatus) {
          setForm((previous) => ({
            ...previous,
            status_id: activeStatus.id,
          }));
        }
      } catch {
        if (!cancelled) {
          setError("Impossible de charger les statuts et groupes.");
        }
      } finally {
        if (!cancelled) setLoadingOptions(false);
      }
    }

    loadOptions();

    return () => {
      cancelled = true;
    };
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
      ...(name === "entry_date" && {
        subscription: {
          ...previous.subscription,
          start_date: previous.subscription.start_date || value,
        },
      }),
    }));
  }

  function handleSubscriptionChange(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      subscription: {
        ...previous.subscription,
        [name]: value,
      },
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (!form.first_name.trim() || !form.last_name.trim()) {
      setError("Le nom et le prénom sont obligatoires.");
      return;
    }

    if (!form.status_id || !form.entry_date) {
      setError("Le statut et la date d'entrée sont obligatoires.");
      return;
    }

    if (hasSubscription) {
      if (
        !form.subscription.amount ||
        Number(form.subscription.amount) <= 0 ||
        !form.subscription.start_date
      ) {
        setError("Veuillez compléter correctement la cotisation.");
        return;
      }
    }

    const payload = {
      first_name: form.first_name.trim(),
      last_name: form.last_name.trim(),
      phone: form.phone.trim() || null,
      email: form.email.trim() || null,
      status_id: form.status_id,
      group_id: form.group_id || null,
      entry_date: form.entry_date,
    };

    if (hasSubscription) {
      payload.subscription = {
        amount: Number(form.subscription.amount),
        frequency: form.subscription.frequency,
        start_date: form.subscription.start_date,
      };
    }

    try {
      setSaving(true);

      await createMember(payload);

      navigate("/members");
    } catch (err) {
      const response = err.response?.data;

      setError(
        response?.errors?.map((item) => item.msg).join(", ") ||
          response?.message ||
          "Une erreur est survenue pendant l'enregistrement.",
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <Box sx={{ maxWidth: 950, mx: "auto", pb: 4 }}>
      <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
        <Button onClick={() => navigate("/members")} startIcon={<ArrowBack />}>
          Retour
        </Button>

        <Typography variant="h5" fontWeight={700}>
          Nouveau membre
        </Typography>
      </Stack>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {loadingOptions ? (
        <CircularProgress />
      ) : (
        <Box component="form" onSubmit={handleSubmit}>
          <Paper sx={{ p: { xs: 2, md: 3 }, mb: 3, borderRadius: 3 }}>
            <Typography variant="h6" fontWeight={600} mb={2}>
              Informations personnelles
            </Typography>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "repeat(2, minmax(0, 1fr))",
                },
                gap: 2,
              }}
            >
              <TextField
                label="Nom"
                name="last_name"
                value={form.last_name}
                onChange={handleChange}
                required
                fullWidth
              />

              <TextField
                label="Prénom"
                name="first_name"
                value={form.first_name}
                onChange={handleChange}
                required
                fullWidth
              />

              <TextField
                label="Téléphone"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                fullWidth
              />

              <TextField
                label="Email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                fullWidth
              />
            </Box>
          </Paper>

          <Paper sx={{ p: { xs: 2, md: 3 }, mb: 3, borderRadius: 3 }}>
            <Typography variant="h6" fontWeight={600} mb={2}>
              Informations caisse
            </Typography>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "repeat(2, minmax(0, 1fr))",
                },
                gap: 2,
              }}
            >
              <TextField
                select
                label="Statut"
                name="status_id"
                value={form.status_id}
                onChange={handleChange}
                required
                fullWidth
              >
                {options.statuses.map((status) => (
                  <MenuItem key={status.id} value={status.id}>
                    {status.label}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                select
                label="Groupe"
                name="group_id"
                value={form.group_id}
                onChange={handleChange}
                fullWidth
              >
                <MenuItem value="">Aucun groupe</MenuItem>

                {options.groups.map((group) => (
                  <MenuItem key={group.id} value={group.id}>
                    {group.name}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                label="Date d'entrée"
                name="entry_date"
                type="date"
                value={form.entry_date}
                onChange={handleChange}
                slotProps={{
                  inputLabel: { shrink: true },
                }}
                required
                fullWidth
              />
            </Box>
          </Paper>

          <Paper sx={{ p: { xs: 2, md: 3 }, mb: 3, borderRadius: 3 }}>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              justifyContent="space-between"
              alignItems={{ xs: "flex-start", sm: "center" }}
              spacing={1}
            >
              <Typography variant="h6" fontWeight={600}>
                Cotisation initiale
              </Typography>

              <FormControlLabel
                control={
                  <Switch
                    checked={hasSubscription}
                    onChange={(event) =>
                      setHasSubscription(event.target.checked)
                    }
                  />
                }
                label="Configurer une cotisation"
              />
            </Stack>

            {hasSubscription && (
              <>
                <Divider sx={{ my: 2 }} />

                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: {
                      xs: "1fr",
                      sm: "repeat(2, minmax(0, 1fr))",
                    },
                    gap: 2,
                  }}
                >
                  <TextField
                    label="Montant (Ar)"
                    name="amount"
                    type="number"
                    value={form.subscription.amount}
                    onChange={handleSubscriptionChange}
                    slotProps={{
                      htmlInput: { min: 1, step: 1 },
                    }}
                    required
                    fullWidth
                  />

                  <TextField
                    select
                    label="Fréquence"
                    name="frequency"
                    value={form.subscription.frequency}
                    onChange={handleSubscriptionChange}
                    required
                    fullWidth
                  >
                    <MenuItem value="MONTHLY">Mensuelle</MenuItem>
                    <MenuItem value="YEARLY">Annuelle</MenuItem>
                    <MenuItem value="CUSTOM">Personnalisée</MenuItem>
                  </TextField>

                  <TextField
                    label="Date début"
                    name="start_date"
                    type="date"
                    value={form.subscription.start_date}
                    onChange={handleSubscriptionChange}
                    slotProps={{
                      inputLabel: { shrink: true },
                    }}
                    required
                    fullWidth
                  />
                </Box>
              </>
            )}
          </Paper>

          <Stack
            direction={{ xs: "column-reverse", sm: "row" }}
            justifyContent="flex-end"
            spacing={2}
          >
            <Button
              variant="outlined"
              onClick={() => navigate("/members")}
              disabled={saving}
            >
              Annuler
            </Button>

            <Button
              type="submit"
              variant="contained"
              startIcon={<Save />}
              disabled={saving}
            >
              {saving ? "Enregistrement..." : "Créer le membre"}
            </Button>
          </Stack>
        </Box>
      )}
    </Box>
  );
}

export default MemberCreate;
