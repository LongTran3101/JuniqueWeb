import React, { useRef, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  RadioGroup,
  Radio,
  FormLabel,
  FormControl,
  Select,
  MenuItem,
  Card,
  CardMedia,
  Divider,
  InputLabel,
  IconButton,
  Grid,
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";

const UploadDesign: React.FC = () => {
  const [account, setAccount] = useState("");
  const [title, setTitle] = useState("elephant wildlife animal nature");
  const [description, setDescription] = useState("elephant wildlife animal nature");
  const [tag, setTag] = useState("elephant,wildlife,animal");
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [audience, setAudience] = useState("everyone");
  const [designFor, setDesignFor] = useState("everyone");
  const [imagePreview, setImagePreview] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
    }
  };

  return (
    <Box p={2} maxWidth="1000px" >
      <Grid container spacing={2}>
        {/* Left Column - Image Preview */}
        <Grid item size={4}>
          <Grid item xs={12} md={4}>
            <Box display="flex" flexDirection="column" alignItems="center">
              <IconButton
                onClick={handleImageClick}
                sx={{
                  width: 48,
                  height: 48,
                  backgroundColor: "#1976d2",
                  color: "#fff",
                  mb: 2,
                  "&:hover": {
                    backgroundColor: "#115293",
                  },
                }}
              >
                <UploadFileIcon />
              </IconButton>
              <input
                type="file"
                accept="image/*"
                hidden
                ref={fileInputRef}
                onChange={handleImageChange}
              />
              {imagePreview && (
                <Card variant="outlined" sx={{ width: "100%", maxWidth: 240 }}>
                  <CardMedia
                    component="img"
                    image={imagePreview}
                    alt="Design preview"
                    sx={{ objectFit: "contain", maxHeight: 300 }}
                  />
                </Card>
              )}
            </Box>
          </Grid>
        </Grid>
        <Grid item size={8}>
          {/* Right Column - Form */}
          <Grid item xs={12} md={8}>
            <FormControl fullWidth size="small" sx={{ mb: 2 }}>
              <InputLabel id="account-select-label">Account</InputLabel>
              <Select
                labelId="account-select-label"
                value={account}
                label="Account"
                onChange={(e) => setAccount(e.target.value)}
              >
                <MenuItem value=""><em>None</em></MenuItem>
                <MenuItem value="Account 1">Account 1</MenuItem>
                <MenuItem value="Account 2">Account 2</MenuItem>
                <MenuItem value="Account 3">Account 3</MenuItem>
              </Select>
            </FormControl>

            <TextField
              fullWidth
              label="Title"
              variant="outlined"
              size="small"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              label="Description (optional)"
              multiline
              minRows={2}
              maxRows={4}
              size="small"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="tag (optional)"
              multiline
              minRows={2}
              maxRows={4}
              size="small"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Divider sx={{ mb: 2 }} />

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <FormControl component="fieldset" size="small">
                  <FormLabel>Design created for?</FormLabel>
                  <RadioGroup
                    row
                    value={audience}
                    onChange={(e) => setAudience(e.target.value)}
                  >
                    <FormControlLabel value="everyone" control={<Radio size="small" />} label="Everyone" />
                    <FormControlLabel value="women" control={<Radio size="small" />} label="Women" />
                    <FormControlLabel value="men" control={<Radio size="small" />} label="Men" />
                  </RadioGroup>
                </FormControl>
              </Grid>

              <Grid item xs={6}>
                <FormControl component="fieldset" size="small">
                  <FormLabel>Who is it for?</FormLabel>
                  <RadioGroup
                    row
                    value={designFor}
                    onChange={(e) => setDesignFor(e.target.value)}
                  >
                    <FormControlLabel value="everyone" control={<Radio size="small" />} label="Everyone" />
                    <FormControlLabel value="adults" control={<Radio size="small" />} label="Adults only" />
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>

            <Box textAlign="right" mt={2}>
              <Button variant="contained" color="primary" size="small">
                Upload
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Grid>



    </Box>
  );
};

export default UploadDesign;
